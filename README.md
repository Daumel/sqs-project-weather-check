# Weather Check

Bei dem Projekt _Weather Check_ handelt es sich um eine Next.js Anwendung, die das aktuelle Wetter für einen ausgewählten Ort abruft und anzeigt. Eine detaillierte Dokumentation des Projekts befindet sich im [Wiki](https://github.com/Daumel/sqs-project-weather-check/wiki).

## Entwickler-Setup

In diesem Abschnitt werden die notwendigen Schritte beschrieben, um die Anwendung lokal zu starten.

### 1. Abhängigkeiten installieren

Mit folgendem Befehl werden die Projektabhängigkeiten installiert:

```bash
yarn install
```

Dieser Vorgang installiert nicht nur die benötigten Abhängigkeiten, sondern richtet auch Git Hooks ein. Diese führen vor jedem Commit Auto-Fix Operationen von Prettier und ESLint durch. Darüber hinaus wird ein Datenbank-Client für das ORM-Tool Prisma eingerichtet.

### 2. Datenbank erstellen

**Hinweis:** Für das Ausprobieren der Anwendung kann dieser Schritt übersprungen werden. Es wurde nämlich eine Datenbank erstellt, die für Testzwecke verwendet werden kann.

Das Projekt nutzt eine Serverless-MySQL-Plattform namens Planetscale. Hier sind die Schritte, um eine Planetscale-Datenbank über die CLI zu erstellen und lokal anzubinden:

1. Erstelle einen [Planetscale Account](https://auth.planetscale.com/sign-up)
2. Installiere die [Planetscale CLI](https://github.com/planetscale/cli#installation)
3. Führe in der Kommandozeile den Befehl `pscale auth login` aus, um dich mit deinem Account anzumelden
4. Erstelle eine Datenbank mit dem Befehl `pscale db create sqs-project-weather-check --region eu-central`
5. Erstelle einen Dev-Branch mit dem Befehl `pscale branch create sqs-project-weather-check dev`
6. Verbinde dich lokal mit der Datenbank mit dem Befehl `pscale connect sqs-project-weather-check dev --port 3309`
7. Pushe das aktuelle Tabellenschema mit dem Befehl `npx prisma db push`

Es gibt nun zwei Möglichkeiten, mit der angelegten Datenbank lokal zu arbeiten:

-   Lasse die Verbindung mit der Datenbank über den Port 3309 offen und verwende im nachfolgenden Schritt die Umgebungsvariable `DATABASE_URL='mysql://root@127.0.0.1:3309/sqs-project-weather-check'`
-   Erstelle über die Weboberfläche von Planetscale einen [Connection String](https://planetscale.com/docs/concepts/connection-strings) und verwende diesen als Umgebungsvariable für die `DATABASE_URL`

### 3. Umgebungsvariablen in einer .env-Datei anlegen

Im Root-Verzeichnis des Projekts muss eine `.env`-Datei mit folgenden zwei Umgebungsvariablen angelegt werden (siehe auch .env.example):

-   `DATABASE_URL`: Connection String zur Datenbank
-   `API_Key`: API-Key für die OpenWeatherMap API

Für das Ausprobieren der Anwendung können die Daten in der Keepass-Datei verwendet werden.

### 5. Anwendung starten

Starten der Anwendung im Entwicklungsmodus:

```bash
yarn dev
```

Starten der Anwendung im Produktionsmodus:

```bash
yarn build
yarn start
```

Die gestartete Anwendung ist nun unter [localhost:3000](http://localhost:3000) erreichbar.

## Ausführung von Tests

In diesem Abschnitt wird beschrieben, wie die unterschiedlichen Tests lokal ausgeführt werden können.

### Unit- und Integrationstests

Bei den Unit- und Integrationstests ist ein Start der Anwendung nicht notwendig. Die Tests werden mit folgenden Befehlen ausgeführt:

```bash
yarn test:unit
yarn test:integration
```

### End-to-End-Tests

Bei den End-to-End-Tests muss die Anwendung zuerst gestartet werden. Die Tests werden mit folgendem Befehl ausgeführt:

```bash
yarn test:e2e
```

### Architekturtests

Die Architekturtests werden mit folgendem Befehl ausgeführt:

```bash
yarn test:architecture
```

Die Datei `.dependency-cruiser.js` im Root-Verzeichnis des Projekts enthält die Konfiguration für die Architekturtests.

### Stresstests

Vor der Ausführung der Stresstests ist k6 zu installieren (siehe [Installationsanleitung](https://k6.io/docs/get-started/installation/)).

Nach erfolgreicher Installation können die Stresstests wie folgt gegen die Produktionsumgebung ausgeführt werden:

```bash
k6 run __tests__/k6/stress-test.js
```

Zum Ausführen der Stresstests gegen eine andere Umgebung ist die Umgebungsvariable `HOSTNAME` zu setzen:

```bash
k6 run -e HOSTNAME=http://127.0.0.1 __tests__/k6/stress-test.js
```

### Formatierung

Die Formatierung wird mit folgendem Befehl überprüft:

```bash
yarn check:formatting
```

Die Datei `.prettierrc` im Root-Verzeichnis des Projekts enthält die Konfiguration für die Formatierung.

### HTTP Sample Calls

Zum Testen von beispielhaften HTTP-Requests gegen die API-Endpunkte ist die Datei `__tests__/sample_calls/weather-check.http` zu öffnen.
Mithilfe des von IntelliJ bereitgestellten [HTTP Clients](https://www.jetbrains.com/help/idea/http-client-in-product-code-editor.html) lassen sich die einzelnen Requests nun über den angezeigten Play-Button ausführen.

## Einrichtung eines Linters

In der CI-Pipeline wird der Code zwar schon durch Tools wie SonarQube und ESLint geprüft. Es ist jedoch sinnvoll, auch lokal einen Linter einzurichten, um Fehler bereits während der Entwicklung zu erkennen.
In IntelliJ kann ESLint über die [Code Inspections](https://www.jetbrains.com/help/idea/code-inspection.html#access-inspections-and-settings) in wenigen Schritten aktiviert werden. Die IDE erkennt bei der
Aktivierung der Einstellung automatisch die in diesem Projekt befindliche ESLint-Konfiguration (siehe `.eslintrc.json`) und passt das Linting dementsprechend an.
