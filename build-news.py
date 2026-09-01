import json,re,urllib.request,xml.etree.ElementTree as ET
from pathlib import Path
RSS='https://www.maliweb.net/rss/latest-posts'
OUT=Path('news.json'); IMG=Path('news-images'); IMG.mkdir(exist_ok=True)
def txt(x): return re.sub(r'<[^>]+>',' ',x or '').strip()
def image_from_html(s):
    m=re.search(r'<img[^>]+(?:src|data-src)=["\']([^"\']+)',s or '',re.I)
    return m.group(1) if m else ''
def download(url,i):
    if not url:return ''
    try:
        req=urllib.request.Request(url,headers={'User-Agent':'CiwaraFM-News/1.0'})
        data=urllib.request.urlopen(req,timeout=12).read()
        ext='.jpg'
        ct=''
        try: ct=urllib.request.urlopen(req,timeout=5).headers.get('Content-Type','')
        except: pass
        if 'png' in ct: ext='.png'
        elif 'webp' in ct: ext='.webp'
        p=IMG/f'{i}{ext}';p.write_bytes(data);return str(p).replace('\\','/')
    except:return ''
req=urllib.request.Request(RSS,headers={'User-Agent':'CiwaraFM-News/1.0'})
root=ET.fromstring(urllib.request.urlopen(req,timeout=20).read())
items=[]
for i,node in enumerate(root.findall('.//item')[:7]):
    title=node.findtext('title','')
    link=node.findtext('link','')
    desc=node.findtext('description','') or ''
    pub=node.findtext('pubDate','') or ''
    img=''
    for c in node:
        tag=c.tag.split('}')[-1]
        if tag in ('content','thumbnail','enclosure'):
            img=c.attrib.get('url') or c.attrib.get('href') or c.attrib.get('resource') or c.attrib.get('src') or ''
            if img:break
    if not img: img=image_from_html(desc)
    local=download(img,i) if img else ''
    items.append({'title':txt(title),'link':link,'description':txt(desc)[:220],'pubDate':pub,'image':local or img})
OUT.write_text(json.dumps({'items':items},ensure_ascii=False,indent=2),encoding='utf-8')
print(f'Generated {len(items)} news items')
