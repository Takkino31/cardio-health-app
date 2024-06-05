import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your_secret_key'
    TWILIO_ACCOUNT_SID = 'your_account_sid'
    TWILIO_AUTH_TOKEN = 'your_auth_token'
    TWILIO_PHONE_NUMBER = '+22177769440'


import http.client
import json

conn = http.client.HTTPSConnection("e1n3p3.api.infobip.com")
payload = json.dumps({
    "name": "2fa test application",
    "enabled": True,
    "configuration": {
        "pinAttempts": 10,
        "allowMultiplePinVerifications": True,
        "pinTimeToLive": "15m",
        "verifyPinLimit": "1/3s",
        "sendPinPerApplicationLimit": "100/1d",
        "sendPinPerPhoneNumberLimit": "10/1d"
    }
})
headers = {
    'Authorization': 'App b7c6954008d871b7c979bb6e1e87f45e-f7bcbcf7-f563-41c2-88f2-d34ea730854b',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}
conn.request("POST", "/2fa/2/applications", payload, headers)
res = conn.getresponse()
data = res.read()
print(data.decode("utf-8"))