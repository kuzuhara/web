import os
import sys
import re
import webbrowser
import tkinter
from http.server import HTTPServer,SimpleHTTPRequestHandler
host = "localhost"
port = 8000
url=host+r":"+str(port)
argc=sys.argv
if len(argc) > 1:
	if os.path.exists(argc[1]):
		os.chdir(os.path.dirname(argc[1]))
		if os.path.isfile(argc[1]):
			url=url+"/"+os.path.basename(argc[1])
		else:
			os.chdir(os.path.basename(argc[1]))
httpd = HTTPServer((host,port),SimpleHTTPRequestHandler)
print(url)
print('exit to "Ctrl + c"')
if os.path.exists("C:\\Program Files (x86)\\Mozilla Firefox\\firefox.exe"):
	webbrowser.get('"C:\\Program Files (x86)\\Mozilla Firefox\\firefox.exe" %s').open_new_tab(url)
httpd.serve_forever()