import urllib.request
import json
import getpass

print("========================================")
print("WattTime Account Registration")
print("========================================")

username = input("Enter a new username (no spaces): ")
email = input("Enter your email address: ")
password = getpass.getpass("Enter a new password: ")

data = json.dumps({
    'username': username,
    'password': password,
    'email': email,
    'org': 'GreenStep'
}).encode('utf-8')

req = urllib.request.Request('https://api.watttime.org/register', data=data, headers={'Content-Type': 'application/json'})

try:
    res = urllib.request.urlopen(req)
    if res.getcode() == 200:
        response_data = json.loads(res.read().decode('utf-8'))
        print("\n✅ Success!")
        print(f"Server message: {response_data.get('ok', 'Account created.')}")
        print("\n⚠️ IMPORTANT: Please check your email inbox and click the verification link!")
        print("\nUske baad aap apna naya username aur password backend/.env file mein daal sakte hain:")
        print(f"WATTTIME_USERNAME={username}")
        print("WATTTIME_PASSWORD=********")
    else:
        print("\n❌ Failed to register.")
except Exception as e:
    print(f"\n❌ Error occurred: {e}")
    try:
        error_msg = e.read().decode('utf-8')
        print(f"Details: {error_msg}")
    except:
        pass
