# Neighbourhood App

**Neighbourhood App** to aplikacja webowa będąca portalem mieszkańca spółdzielni mieszkaniowej. Projekt powstał z myślą o uproszczeniu codziennej komunikacji między mieszkańcami,a administracją budynku - wszystkie najważniejsze sprawy dostępne są w jednym miejscu, bez konieczności osobistych wizyt czy telefonów.
Aplikacja umożliwia zarządzanie opłatami eksploatacyjnymi wraz z płatnością online, zgłaszanie i śledzenie usterek technicznych, a także bezpośredni kontakt z administracją przez czat. Mieszkańcy mogą śledzić ogłoszenia spółdzielni, pobierać dokumenty oraz uczestniczyć w życiu osiedla poprzez forum dyskusyjne.

Projekt został wykonany w React z wykorzystaniem React Router DOM, Firebase Authentication, Firebase Firestore oraz Google Analytics 4.

---

# Funkcjonalności

- logowanie użytkownika z opcją zapamiętania sesji na urządzeniu,
- rejestracja konta z walidacją formularza inline (imię, nazwisko, e-mail, telefon, hasło),
- wymagania złożoności hasła: min. 8 znaków, 1 wielka litera, 1 cyfra, 1 znak specjalny,
- akceptacja regulaminu i polityki prywatności podczas rejestracji (z modalem treści),
- rejestracja przez token zaproszenia przekazany w adresie URL,
- odzyskiwanie hasła przez link wysłany na adres e-mail,
- resetowanie hasła przez link z tokenem z automatycznym przekierowaniem po zakończeniu,
- chronione trasy - widoki aplikacji dostępne wyłącznie po zalogowaniu,
- boczna nawigacja z hamburger menu dla urządzeń mobilnych, awatarem użytkownika i przyciskiem wylogowania,
- wylogowanie z automatycznym czyszczeniem danych localStorage,
- dashboard z przeglądem statusu opłat, aktywnych zgłoszeń, ogłoszenia i skrzynki odbiorczej,
- podgląd bieżących opłat eksploatacyjnych z rozbiciem na pozycje,
- płatność rachunków przez BLIK (modal z kodem 6-cyfrowym) lub przelew online przez Przelewy24,
- historia transakcji z możliwością rozwijania starszych wpisów,
- zgłaszanie usterek z wyborem kategorii (Awaria, Usterka, Sprzątanie, Inne), miejsca i opisu problemu,
- lista zgłoszeń z filtrami Wszystkie / Aktywne i rozwijaniem,
- modal szczegółów zgłoszenia ze statusem i danymi kontaktowymi administracji,
- ogłoszenia spółdzielni z modalem szczegółów i możliwością rozwijania listy,
- forum mieszkańców z wątkami dyskusji i kategoriami (Sąsiedzi, Usługi, Zwierzęta, Porządek, Infrastruktura, Inne),
- widok wątku forum z komentarzami, cytowaniem, polubieniam, udostępnianiem i zgłaszaniem,
- tworzenie nowych wpisów na forum z kategorią i opcjonalnym zdjęciem,
- czat z administracją budynku z obsługą emoji, załączników i historią wiadomości,
- pobieranie dokumentów PDF (Statut Spółdzielni, Regulamin Porządku Domowego),
- profil użytkownika z edycją danych kontaktowych (e-mail, telefon) zapisywanych do Firestore,
- zmiana hasła z weryfikacją obecnego hasła (re-autentykacja),
- preferencje powiadomień e-mail i SMS z persystencją w localStorage,
- podgląd danych lokalu (adres, numer, piętro, metraż) i statusu konta,
- szkieletowy loader podczas wczytywania danych użytkownika,
- powiadomienia UI przez React Toastify,
- persystencja danych aplikacji przez localStorage,
- śledzenie analityczne przez Google Analytics 4.

---

# Technologie

- React 19
- JavaScript (JSX)
- React Router DOM 7
- Firebase Authentication
- Firebase Firestore
- React GA4
- React Toastify
- Context API
- CSS
- localStorage

---

# Struktura projektu

```bash
neighbourhood-app/
│   .gitignore
│   package-lock.json
│   package.json
│   README.md
│
├───node_modules
├───public
│   │   favicon.ico
│   │   index.html
│   │   logo.svg
│   │   logo192.png
│   │   logo512.png
│   │   manifest.json
│   │   profile-avatar.png
│   │   robots.txt
│   │
│   ├───docs
│   │       regulamin-neighbourhood.pdf
│   │       statut-neighbourhood.pdf
│   │
│   └───mocks
│           announcement-image.png
│           emergency-image.png
│
└───src
    │   App.css
    │   App.js
    │   App.test.js
    │   AuthContext.js
    │   index.css
    │   index.js
    │   logo.svg
    │   reportWebVitals.js
    │   setupTests.js
    │
    ├───components
    │   ├───analytics-tracker
    │   │       analytics-tracker.jsx
    │   │
    │   ├───buttons
    │   │       Button.css
    │   │       Button.jsx
    │   │       index.js
    │   │       LinkButton.css
    │   │       LinkButton.jsx
    │   │
    │   ├───content-square
    │   │       useContentsquare.js
    │   │
    │   ├───fields
    │   │       CheckboxField.css
    │   │       CheckboxField.jsx
    │   │       EmailField.css
    │   │       EmailField.jsx
    │   │       index.js
    │   │       PasswordField.css
    │   │       PasswordField.jsx
    │   │       PhoneField.jsx
    │   │       TextField.css
    │   │       TextField.jsx
    │   │
    │   ├───footer
    │   │       AuthFooter.css
    │   │       AuthFooter.jsx
    │   │       index.js
    │   │
    │   ├───icons
    │   │       AlertTriangleIcon.jsx
    │   │       BellIcon.jsx
    │   │       BrushIcon.jsx
    │   │       CameraIcon.jsx
    │   │       ChatBubbleIcon.jsx
    │   │       CheckIcon.jsx
    │   │       ChevronDownIcon.jsx
    │   │       ChevronRightIcon.jsx
    │   │       CommunicationIcon.jsx
    │   │       DashboardIcon.jsx
    │   │       DotsIcon.jsx
    │   │       DotsMoreIcon.jsx
    │   │       DownloadIcon.jsx
    │   │       EyeIcon.jsx
    │   │       EyeOffIcon.jsx
    │   │       FinanceIcon.jsx
    │   │       FlagIcon.jsx
    │   │       FlameIcon.jsx
    │   │       GatheringIcon.jsx
    │   │       GlobeIcon.jsx
    │   │       HistoryIcon.jsx
    │   │       HomeIcon.jsx
    │   │       index.js
    │   │       LockIcon.jsx
    │   │       LogoutIcon.jsx
    │   │       MailIcon.jsx
    │   │       PaperclipIcon.jsx
    │   │       PdfIcon.jsx
    │   │       PhoneCallIcon.jsx
    │   │       PhoneIcon.jsx
    │   │       PlusCircleIcon.jsx
    │   │       ProfileIcon.jsx
    │   │       ReceiptIcon.jsx
    │   │       SendIcon.jsx
    │   │       ShareIcon.jsx
    │   │       ShieldCheckIcon.jsx
    │   │       SmileIcon.jsx
    │   │       SparkleIcon.jsx
    │   │       TermometerIcon.jsx
    │   │       ThumbUpIcon.jsx
    │   │       TicketsIcon.jsx
    │   │       TicketWrenchIcon.jsx
    │   │       TrashIcon.jsx
    │   │       UserIcon.jsx
    │   │       WarningIcon.jsx
    │   │       WaterDropIcon.jsx
    │   │       WrenchIcon.jsx
    │   │
    │   ├───layout
    │   │       AppShell.css
    │   │       AppShell.jsx
    │   │       ScrollToTop.jsx
    │   │
    │   ├───navbar
    │   │       Navbar.css
    │   │       Navbar.jsx
    │   │
    │   └───protected-route
    │           Loader.css
    │           Loader.jsx
    │           ProtectedRoute.js
    │
    ├───firebase
    │       AuthContext.js
    │       firebase.js
    │
    ├───pages
    │   ├───chat
    │   │       Chat.css
    │   │       Chat.jsx
    │   │
    │   ├───communication
    │   │       Communication.css
    │   │       Communication.jsx
    │   │
    │   ├───create-post
    │   │       CreatePost.css
    │   │       CreatePost.jsx
    │   │
    │   ├───dashboard
    │   │   │   Dashboard.css
    │   │   │   Dashboard.jsx
    │   │   │
    │   │   └───components
    │   │           DashboardBanner.jsx
    │   │           DashboardCard.jsx
    │   │
    │   ├───finances
    │   │       Finances.css
    │   │       Finances.jsx
    │   │
    │   ├───forgot-password
    │   │       ForgotPassword.css
    │   │       ForgotPassword.jsx
    │   │
    │   ├───forum-thread
    │   │       ForumThread.css
    │   │       ForumThread.jsx
    │   │
    │   ├───login
    │   │       Login.css
    │   │       Login.jsx
    │   │
    │   ├───profile
    │   │   │   Profile.css
    │   │   │   Profile.jsx
    │   │   │
    │   │   └───components
    │   │           AccountStatus.jsx
    │   │           ApartmentDetails.jsx
    │   │           ContactDetails.jsx
    │   │           NotificationPreferences.jsx
    │   │           SecuritySettings.jsx
    │   │
    │   ├───register
    │   │   │   Register.css
    │   │   │   Register.jsx
    │   │   │
    │   │   └───components
    │   │           TermsLabel.css
    │   │           TermsLabel.jsx
    │   │           TermsModal.css
    │   │           TermsModal.jsx
    │   │
    │   ├───reset-password
    │   │       ResetPassword.css
    │   │       ResetPassword.jsx
    │   │
    │   └───tickets
    │           Tickets.css
    │           Tickets.jsx
    │
    └───styles
            variables.css
```

---

# Architektura aplikacji

Projekt podzielono na moduły zgodnie z dobrymi praktykami React.

## Components

Folder `components` zawiera reużywalne elementy interfejsu:

- `components/analytics-tracker` - komponent `AnalyticsTracker` rejestrujący zmiany ścieżki i wysyłający zdarzenia do Google Analytics 4,
- `components/buttons` - przyciski `Button` i `LinkButton` stosowane w całej aplikacji,
- `components/fields` - kontrolki formularzy: `EmailField`, `PasswordField`, `CheckboxField`, `TextField`, `PhoneField`,
- `components/footer` - stopka `AuthFooter` wyświetlana na stronach autoryzacji,
- `components/icons` - ikony SVG stosowane w całej aplikacji,
- `components/layout` - `AppShell` (powłoka widoków chronionych), `Navbar` (boczna nawigacja) oraz `ScrollToTop` (reset pozycji scrolla przy zmianie trasy),
- `components/protected-route` - `ProtectedRoute` blokujący dostęp niezalogowanym użytkownikom oraz `Loader` do szkieletowego ładowania widoków.

## Pages

Folder `pages` zawiera widoki aplikacji pogrupowane według głównych sekcji:

- `login`, `forgot-password`, `reset-password`, `register` - przepływ autoryzacji,
- `dashboard` - ekran główny z kartami statusu,
- `finances` - opłaty i historia transakcji,
- `tickets` - formularz i lista zgłoszeń usterek,
- `communication` - ogłoszenia, skrzynka odbiorcza, forum i dokumenty,
- `forum-thread` - widok pojedynczego wątku forum,
- `chat` - czat z administracją,
- `create-post` - formularz nowego wpisu na forum,
- `profile` - profil użytkownika, ustawienia bezpieczeństwa i dane lokalu.

## Navigation

Aplikacja wykorzystuje React Router DOM v7 z hierarchiczną konfiguracją tras w `App.js`.

Trasy publiczne (`/login`, `/forgot-password`, `/reset-password/:token`, `/register/:token`) są dostępne bez logowania. Wszystkie pozostałe trasy owinięte są w `ProtectedRoute`, który przekierowuje niezalogowanych użytkowników do strony logowania. Widoki chronione renderowane są wewnątrz `AppShell`, który dostarcza wspólny layout z boczną nawigacją.

Nawigacja (`Navbar`) wyświetlana jest jako boczny panel. Na urządzeniach mobilnych zwija się i jest dostępna przez hamburger menu. W dolnej części panelu znajdują się awatar użytkownika, jego imię i nazwisko, numer lokalu oraz przycisk wylogowania.

## Firebase

Folder `firebase` zawiera konfigurację i warstwę integracji z Firebase:

- `firebase.js` - inicjalizacja klienta Firebase (Authentication i Firestore),
- `AuthContext.js` - kontekst `AuthProvider` udostępniający dane zalogowanego użytkownika wszystkim komponentom aplikacji.

## Context API

Współdzielenie stanu logowania odbywa się przez `AuthContext`. Kontekst dostarcza:

- obiekt `user` z Firebase Authentication,
- obiekt `userData` z danymi z Firestore aktualizowanymi w czasie rzeczywistym przez `onSnapshot` (imię, nazwisko, telefon, e-mail),
- ciąg `role` pobierany z Firebase custom claims tokenu (`getIdTokenResult`),
- ciąg `groupId` z dokumentu użytkownika w Firestore,
- flagę `loading` wykorzystywaną do renderowania szkieletowego loadera.

## Persystencja danych

Dane tymczasowe przechowywane są w `localStorage`:

- wiadomości czatu (`neighbourhood_chat_messages_{uid}`),
- wpisy użytkownika na forum (`forum_posts`),
- komentarze do wątków (`forum_comments_{threadId}`),
- polubienia wątków (`forum_liked_{threadId}`),
- status płatności (`ifPaymentDone`),
- liczba nieprzeczytanych wiadomości (`chat_unread_count`),
- preferencje powiadomień (`notification_preferences`),
- złożone zgłoszenia (`submitted_tickets`).

---

# Nawigacja aplikacji

Aplikacja wykorzystuje React Router DOM v7. Widoki podzielono na publiczny obszar autoryzacji oraz chronione sekcje aplikacji.

| Obszar | Ścieżka | Opis |
|---|---|---|
| Auth | `/login` | Logowanie użytkownika |
| Auth | `/forgot-password` | Odzyskiwanie hasła |
| Auth | `/reset-password/:token` | Resetowanie hasła przez link z tokenem |
| Auth | `/register/:token` | Rejestracja przez token zaproszenia |
| Dashboard | `/` | Ekran główny z przeglądem statusu mieszkańca |
| Finances | `/finances` | Opłaty bieżące, płatności i historia transakcji |
| Tickets | `/tickets` | Zgłoszenia usterek i napraw |
| Communication | `/communication` | Ogłoszenia, skrzynka odbiorcza, forum i dokumenty |
| Forum Thread | `/communication/forum/:threadId` | Widok wątku forum z komentarzami |
| Chat | `/communication/chat` | Czat z administracją budynku |
| Create Post | `/communication/create-post` | Formularz tworzenia nowego wpisu na forum |
| Profile | `/profile` | Profil użytkownika, ustawienia i dane lokalu |

---

# Logowanie użytkownika

Aplikacja wykorzystuje Firebase Authentication z metodą Email/Password.

W projekcie zaimplementowano:

- logowanie z wyborem trwałości sesji (`browserLocalPersistence` / `browserSessionPersistence`) w zależności od opcji „Zapamiętaj mnie",
- rejestrację nowego konta z walidacją inline: imię, nazwisko, e-mail, numer telefonu i hasło (min. 8 znaków, 1 wielka litera, 1 cyfra, 1 znak specjalny),
- akceptację regulaminu i polityki prywatności z modalem ich treści podczas rejestracji,
- rejestrację przez token zaproszenia z adresu URL (`/register/:token`),
- zapis danych profilu do Firestore po rejestracji (imię, nazwisko, telefon, e-mail, rola `resident`),
- odzyskiwanie hasła - wysyłka linku resetującego na adres e-mail,
- resetowanie hasła przez `confirmPasswordReset` z automatycznym przekierowaniem do logowania po 3 sekundach,
- ochronę tras przez `ProtectedRoute` - wyświetla szkieletowy loader podczas inicjalizacji i przekierowuje niezalogowanych do `/login`,
- `AuthProvider` dostarczający dane użytkownika, rolę i dane lokalu do całego drzewa komponentów,
- wylogowanie czyszczące `localStorage` i przekierowujące do `/login`.

## Konfiguracja Firebase Authentication

![Firebase Authentication](./assets/firebase1.png)

## Lista użytkowników Firebase

![Firebase Users](./assets/firebase2.png)

---

# Google Analytics 4

Projekt zawiera integrację z Google Analytics 4 przy użyciu biblioteki `react-ga4`.

Analytics inicjalizowane jest w `App.js` i śledzone automatycznie przez komponent `AnalyticsTracker` podpięty do routera, który rejestruje zdarzenia przy każdej zmianie ścieżki.

![Google Analytics Dashboard](./assets/screens/GA_1.png)

---

# ContentSquare

Projekt zawiera integrację z ContentSquare umożliwiającą analizę zachowań użytkowników w aplikacji.

Skrypt śledzący ładowany jest globalnie przez `public/index.html`, co zapewnia rejestrowanie aktywności na wszystkich podstronach bez dodatkowej konfiguracji w kodzie React.

![ContentSquare Dashboard](./assets/screens/HJ_1.png)

![ContentSquare Dashboard](./assets/screens/HJ_2.png)

![ContentSquare Dashboard](./assets/screens/HJ_3.png)

---

# Screeny aplikacji

## Logowanie

![Login](./assets/screens/LoginPage_Light.png)

![Login](./assets/screens/LoginPage_Dark.png)

## Rejestracja

![Register](./assets/screens/RegisterPage_Light.png)

![Register](./assets/screens/RegisterPage_Dark.png)

## Dashboard

![Dashboard](./assets/screens/DashboardPage_Light.png)

![Dashboard](./assets/screens/DashboardPage_Dark.png)

## Finanse - bieżące opłaty

![Finances](./assets/screens/FinancesPage_Main_Light.png)

![Finances](./assets/screens/FinancesPage_Main_Dark.png)

## Finanse - płatność

![Finances](./assets/screens/FinancesPage_Payment_Light.png)

![Finances](./assets/screens/FinancesPage_Paid_Light.png)

## Finanse - historia

![Finances](./assets/screens/FinancesPage_History_Light.png)

![Finances](./assets/screens/FinancesPage_History_Dark.png)

## Zgłoszenia

![Tickets](./assets/screens/TicketsPage_Main_Light.png)

![Tickets](./assets/screens/TicketsPage_Main_Dark.png)

![Tickets](./assets/screens/TicketsPage_Details_Light.png)

## Komunikacja

![Communication](./assets/screens/CommunicationPage_Main_Light.png)

![Communication](./assets/screens/CommunicationPage_Main_Dark.png)

## Wątek Forum

![Forum Thread](./assets/screens/ForumPage_Main_Light.png)

![Forum Thread](./assets/screens/ForumPage_Main_Dark.png)

![Forum Thread](./assets/screens/ForumPage_Comments_Light.png)

## Nowy wpis na Forum

![Create Post](./assets/screens/CreatePage_Light.png)

![Create Post](./assets/screens/CreatePage_Dark.png)

## Czat z administracją

![Chat](./assets/screens/ChatPage_Light.png)

![Chat](./assets/screens/ChatPage_Dark.png)

## Profil

![Profile](./assets/screens/ProfilePage_Light.png)

![Profile](./assets/screens/ProfilePage_Dark.png)

---

# Uruchomienie projektu

## Instalacja zależności

```bash
npm install
```

## Uruchomienie projektu

```bash
npm start
```

## Budowanie wersji produkcyjnej

```bash
npm run build
```

---

# Autorzy i podział pracy

| Członek zespołu | Zakres odpowiedzialności |
|---|---|
| Przemysław Plata | projektowanie interfejsu w Figmie, implementacja widoków React, stylowanie komponentów CSS, poprawki błędów, hosting, Google Analytics |
| Damian Barwiołek | projektowanie interfejsu w Figmie, implementacja widoków React, stylowanie komponentów CSS, poprawki błędów, dokumentacja README, Hotjar |
| Maksymilian Toczek | projektowanie interfejsu w Figmie, implementacja widoków React, stylowanie komponentów CSS, poprawki błędów, testowanie |

---

# Wspólna praca nad projektem

Wszyscy członkowie zespołu uczestniczyli na równych prawach w każdym etapie tworzenia aplikacji - od projektowania makiet w Figmie, przez implementację widoków w React i stylowanie komponentów w CSS, aż po testowanie i poprawianie błędów.