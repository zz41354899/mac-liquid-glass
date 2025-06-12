# 🍎 Liquid Glass macOS Desktop

一個使用 Next.js + Tailwind CSS 建立的 macOS 風格桌面環境，具有液態玻璃效果和現代化 UI 設計。

## ✨ 功能特色

- 🚀 **開機畫面**：模擬 macOS 開機動畫，含進度條和自動跳轉
- 🎨 **Apple 式透明效果**：使用 `bg-[#ffffff0d]` + `border-white/10` + 發光邊框實現現代感半透明效果
- 🎛️ **控制中心**：模仿 Apple Control Center，可從右上角點擊展開，包含 WiFi、藍牙、亮度、音量控制
- 📱 **Dock 列**：底部應用程式 Dock，支援 hover 縮放效果和工具提示
- 🖼️ **動態背景**：使用 Unsplash 高品質玻璃質感背景圖
- ⚡ **流暢動畫**：使用 Headless UI Transition 實現淡入和縮放動畫
- 🎯 **現代設計**：完全符合 Apple 最新設計語言
- 📱 **RWD 設計**：在手機上支援全螢幕控制中心，自動鎖定背景滾動

## 🛠️ 技術棧

- **Frontend**: Next.js 14 + TypeScript
- **樣式**: Tailwind CSS
- **圖標**: Heroicons
- **UI元件**: Headless UI

## 📦 安裝與執行

1. 安裝依賴套件：
```bash
npm install
```

2. 啟動開發伺服器：
```bash
npm run dev
```

3. 開啟瀏覽器訪問 [http://localhost:3000/boot](http://localhost:3000/boot) 查看開機畫面

## 📁 檔案結構

```
├── pages/
│   ├── _app.tsx          # App 入口
│   ├── index.tsx         # 主桌面頁面
│   └── boot.tsx          # 開機畫面
├── components/
│   ├── ControlCenter.tsx # 控制中心元件
│   └── Dock.tsx          # Dock 列元件
├── styles/
│   └── globals.css       # 全域樣式
├── public/
│   └── apple.svg         # Apple Logo
└── README.md
```

## 🎨 設計說明

- **透明形態效果**：所有卡片都使用 `bg-[#ffffff0d]` + `border-white/10` + 發光內陰影實現 Apple 式透明效果
- **動畫效果**：使用 Tailwind CSS 自定義動畫，包含淡入、縮放等效果
- **響應式設計**：桌面版為彈出面板，手機版為全螢幕控制中心

## 🚀 部署

```bash
npm run build
npm start
```

## 📝 客製化

- 修改 `tailwind.config.js` 調整主題色彩
- 在 `styles/globals.css` 中修改全域樣式
- 替換 `public/apple.svg` 更換 Logo
- 修改背景圖片 URL 更換桌面背景

## 📱 瀏覽器支援

- Chrome 88+
- Firefox 87+
- Safari 14+
- Edge 88+

---

Made with ❤️ using Next.js and Tailwind CSS 