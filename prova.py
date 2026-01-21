import requests
from bs4 import BeautifulSoup


def print_message(url):

    response = requests.get(url)
    response.raise_for_status()

    soup = BeautifulSoup(response.text, "html.parser")
    tables = soup.find_all("table")

    data = {}
    max_x = 0
    max_y = 0

    for table in tables:
        rows = table.find_all("tr")
        for row in rows:
            cells = row.find_all("td")
            if len(cells) != 3:
                continue

            try:
                x = int(cells[0].get_text(strip=True))
                char = cells[1].get_text(strip=True)
                y = int(cells[2].get_text(strip=True))
            except ValueError:
                continue

            data[(x, y)] = char
            max_x = max(max_x, x)
            max_y = max(max_y, y)

    grid = [[" " for _ in range(max_x + 1)] for _ in range(max_y + 1)]

    for (x, y), char in data.items():
        grid[max_y - y][x] = char

    for row in grid:
        print("".join(row))

#url = "https://docs.google.com/document/d/e/2PACX-1vSZ9d7OCd4QMsjJi2VFQmPYLebG2sGqI879_bSPugwOo_fgRcZLAFyfajPWU91UDiLg-RxRD41lVYRA/pub"
url = "https://docs.google.com/document/d/e/2PACX-1vTMOmshQe8YvaRXi6gEPKKlsC6UpFJSMAk4mQjLm_u1gmHdVVTaeh7nBNFBRlui0sTZ-snGwZM4DBCT/pub"
print_message((url))
