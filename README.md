
# MicroCRM
Bei diesem Projekt handelt es sich um die Implementierung der Fallstudie ***MicroCRM***, welche während der Bachelorarbeit ***Machbarkeit und Umsetzung einer Micro-Frontend Architektur mit Web Components*** umgesetzt wurde.
## Abhängigkeiten

Die Implementierung erfolgte unter der Node Version 8.12.0.

Es ist notwendig die Vue CLI, die Angular CLI, die Polymer CLI, den JSON-Server und HTTP-Server global zu installieren.

Es sind folgende Befehle auszuführen

```
	npm i -g @vue/cli@3.2.1
	npm i -g @angular/cli@7.0.5
	npm i -g polymer-cli@1.8.0
	npm i -g http-server@0.11.1
	npm i -g json-server@0.14.0
```

## Build-Prozess

Die Ausführung der einzelnen Build-Prozesse ist den jeweiligen README-Dokumenten der entsprechenden UI-Fragmente und UI-Kompositionen zu entnehmen.

## UI-Fragmente

Die einzelnen UI-Fragmente und deren verwendete Erweiterung sind der folgendne Tabelle zu entnehmen. 

| UI-Fragment | Ordner  | Framework/Bibliothek|
|---|---|---|
| Kunde Erstellung/Anzeige | `./kunde-anlegen` | Angular |
| Kunde Suche | `./kunde-suchen`|Angular |
| Kontakt Erstellung/Anzeige| `./kontakt-anlegen`| JavaScript|
| Kontakt Übersicht| `./kontakt-uebersicht`| Vue.js|
| Zahlung Erstellung/Anzeige| `./zahlung-anlegen`| Polymer|
|Zahlung Übersicht | `./zahlung-uebersicht`| Vue.js|


## UI-Komposition
Die UI-Kompositionen, auch als Implementierung der Makro-Architekturen zu bezeichnen, ist den Ordnern `./All-in-one` und `./navigation` zu entnehmen.
## Backend

Das Backend ist beinhaltet im Ordner ```./backend```

