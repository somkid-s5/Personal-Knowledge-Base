#!/usr/bin/env python3
import base64, gzip, json
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
ASSETS=ROOT/"interactive"/"assets"

def load_data():
    parts=[]
    for p in sorted(ASSETS.glob("content-data.*.b64")):
        parts.append(p.read_text(encoding="utf-8").strip())
    if not parts:
        raise SystemExit("No content-data.*.b64 files found")
    raw=base64.b64decode("".join(parts))
    return json.loads(gzip.decompress(raw).decode("utf-8"))

def main():
    data=load_data()
    print("AZ-104 payload integrity: OK")
    print("meta:", json.dumps(data.get("meta",{}), ensure_ascii=False))
    domains=data.get("domains",[])
    print("domains:", len(domains))
    total_obj=total_topics=total_lines=0
    for d in domains:
        objs=d.get("objectives",[])
        print(f"\nDOMAIN {d.get('n')} {d.get('slug')} | {d.get('displayTitle')} | {d.get('weight')} | objectives={len(objs)}")
        total_obj += len(objs)
        for o in objs:
            topics=o.get("topics",[])
            lines=o.get("lines",[])
            total_topics += len(topics); total_lines += len(lines)
            print(f"  {o.get('code')} {o.get('title')} | topics={len(topics)} lines={len(lines)}")
            for t in topics:
                print(f"    - {t.get('title')}")
    print(f"\nTOTAL objectives={total_obj} topics={total_topics} lines={total_lines}")

if __name__=="__main__":
    main()
