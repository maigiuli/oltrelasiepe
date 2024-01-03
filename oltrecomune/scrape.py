from bs4 import BeautifulSoup
import requests

response = requests.get("https://it.wikipedia.org/wiki/Comuni_dell%27Abruzzo")

soup = BeautifulSoup(response.content)
tables = soup.find_all("table", class_="wikitable")

comuni_table = tables.pop()

comuni_rows = comuni_table.find_all("tr")

data= []

for row in comuni_rows[1:]:
    celle = row.find_all("td")
    data.append({"name": celle[0].text, "province": celle[1].text})





print(data)