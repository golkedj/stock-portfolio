# 📈 Stock Portfolio Tracker

A simple web application to manage and track stock portfolios using real-time data from [Polygon.io](https://polygon.io). Built with **Next.js App Router**, **TypeScript**, **MUI**, and **Zustand** for state management.

> 🛠 Created as part of a frontend engineering interview assignment.

---

## ✨ Features

- ✅ Create and manage multiple stock portfolios
- ✅ Add and remove ticker symbols per portfolio
- ✅ View real-time price, price change (vs previous close), and company name
- ✅ View a 7-day sparkline of price history
- ✅ Clean, responsive UI with Material UI components
- ✅ State management via Zustand

---

## 🚧 Potential Future Improvements

- Handle loading and error states gracefully
- Improve polygon API interactions for robustness:
  - Consider migrating to a custom hook to address the following:
    - Handle potential request limits
    - Track loading and error states
    - Cache results previously retrieved
    - etc.
- Split TickerCard component down into smaller components
- Add session persistence with sqlite or an alternative solution
  - Alternatively implement full persistence solution

---

## 🖼️ Demo

https://github.com/user-attachments/assets/f67fd59c-0731-4859-a80c-f17389af21c3

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/stock-portfolio-tracker.git
cd stock-portfolio-tracker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add your `.env.development`

Create a file called `.env.development` in the root directory with:

```
NEXT_PUBLIC_POLYGON_API_KEY=your_polygon_api_key_here
```

You can get a free API key from [polygon.io](https://polygon.io).

### 4. Run the app locally

```bash
npm run dev
```

Open your browser at [http://localhost:3000](http://localhost:3000).

---

## 🧱 Tech Stack

| Tech           | Usage                                |
| -------------- | ------------------------------------ |
| **Next.js**    | App Router + React Server Components |
| **TypeScript** | Static typing everywhere             |
| **MUI**        | UI component library                 |
| **Zustand**    | Lightweight state management         |
| **Polygon.io** | Stock price data via REST API        |
| **Recharts**   | Sparkline visualization              |

---

## 🧪 Folder Structure

```
/app              → App Router pages & layouts
/components       → Reusable UI components
/hooks            → Custom Hooks
/lib              → API integrations (Polygon)
/public           → Public Assets
/store            → Zustand store
/types            → Type definitions
```

---

## 🧠 Notes

- The app uses client-side state only (no database/backend).
- Designed with performance and UX in mind.
- Real-time prices use the Polygon.io `/snapshot` endpoint.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

> Note: This app was developed as part of an interview assignment and is not intended for production use.

---

## 👤 Author

**David Golke**

- GitHub: [@golkedj](https://github.com/golkedj)
- LinkedIn: [https://www.linkedin.com/in/david-golke](https://www.linkedin.com/in/david-golke)
