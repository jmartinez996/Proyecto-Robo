import requests as req

resp = req.get('http://127.0.0.1:5001/')
print(resp.text)