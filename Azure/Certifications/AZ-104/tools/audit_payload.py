#!/usr/bin/env python3
import base64, gzip, json, re, sys
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
ASSETS=ROOT/"interactive"/"assets"
INVENTORY=ROOT/"official-skills-2026-04-17.json"\nLABS=["rbac-lab.html","storage-lab.html","storage-access-lab.html","compute-lab.html","appservice-lab.html","containers-lab.html","networking-lab.html","loadbalancing-lab.html","monitor-lab.html","recovery-lab.html"]

def load_data():
    parts=[p.read_text(encoding="utf-8").strip() for p in sorted(ASSETS.glob("content-data.*.b64"))]
    if not parts:
        raise SystemExit("No content-data.*.b64 files found")
    return json.loads(gzip.decompress(base64.b64decode("".join(parts))).decode("utf-8"))

def load_packed(pattern):
    parts=[p.read_text(encoding="utf-8").strip() for p in sorted(ASSETS.glob(pattern))]
    if not parts:
        raise SystemExit(f"No files found for {pattern}")
    return json.loads(gzip.decompress(base64.b64decode("".join(parts))).decode("utf-8"))

def norm(s):
    return re.sub(r"\s+"," ",str(s)).casefold()

def objective_text(o):
    bits=[o.get("code",""),o.get("title","")]
    bits.extend(t.get("title","") for t in o.get("topics",[]))
    bits.extend(o.get("lines",[]))
    return norm("\n".join(bits))

def main():
    data=load_data()
    inventory=json.loads(INVENTORY.read_text(encoding="utf-8"))
    questions=load_packed("question-bank.*.b64")
    flashcards=load_packed("flashcards.*.b64")
    actual={}
    for d in data.get("domains",[]):
        for o in d.get("objectives",[]):
            actual[str(o.get("code"))]=o

    print("AZ-104 payload integrity: OK")
    print("payload meta:", json.dumps(data.get("meta",{}), ensure_ascii=False))
    print("official inventory:", inventory["skills_measured"], "skill bullets=", inventory["total_skill_bullets"])
    print("practice assets: questions=",len(questions),"flashcards=",len(flashcards),"labs=",sum((ROOT/"interactive"/x).exists() for x in LABS))
    if len(questions) != 155:
        failures_pre=[f"question bank expected 155, found {len(questions)}"]
    else:
        failures_pre=[]
    if len(flashcards) != 103:
        failures_pre.append(f"flashcards expected 103, found {len(flashcards)}")
    missing_labs=[x for x in LABS if not (ROOT/"interactive"/x).exists()]
    if missing_labs:
        failures_pre.append(f"missing lab files: {missing_labs}")

    failures=list(failures_pre)
    passed=0
    objective_results=[]
    for expected in inventory["objectives"]:
        code=expected["code"]
        o=actual.get(code)
        if not o:
            failures.append(f"{code}: objective missing from payload")
            continue
        txt=objective_text(o)
        rows=[]
        for bullet in expected["bullets"]:
            missing=[term for term in bullet["checks"] if norm(term) not in txt]
            ok=not missing
            passed += int(ok)
            rows.append((bullet["id"],bullet["label"],ok,missing))
            if not ok:
                failures.append(f'{bullet["id"]} {bullet["label"]}: missing evidence terms {missing}')
        objective_results.append((code,expected["title"],rows))

    for code,title,rows in objective_results:
        good=sum(1 for _,_,ok,_ in rows if ok)
        print(f"\n{code} {title}: {good}/{len(rows)}")
        for bid,label,ok,missing in rows:
            print(f"  {'PASS' if ok else 'FAIL'} {bid} {label}" + (f" | missing={missing}" if missing else ""))

    total=inventory["total_skill_bullets"]
    print(f"\nCOVERAGE RESULT: {passed}/{total} evidence checks passed")
    if failures:
        print("\nFAILURES:")
        for item in failures:
            print("-",item)
        sys.exit(1)

if __name__=="__main__":
    main()
