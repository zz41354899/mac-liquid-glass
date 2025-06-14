# 🍎 Liquid Glass macOS Desktop

一個採用 Next.js 和 TypeScript 建構的 macOS 風格桌面環境，具有完整的 liquid glass（液體玻璃）效果。

## ✨ 主要特色

- 🎨 **純 CSS Glassmorphism 效果** - 完全移除 CDN 依賴，使用自製的玻璃形態樣式
- 🖥️ **macOS 風格介面** - 忠實還原 macOS 的視覺設計
- 📱 **響應式設計** - 完美支援桌面和手機裝置
- 🎯 **多樣化元件** - 包含控制中心、Dock、桌面圖示等
- ⚡ **高效能動畫** - 使用 CSS 動畫和 backdrop-filter 實現流暢效果
- 🌊 **背景動畫效果** - 緩慢的背景圖片動畫增強視覺體驗

## 🎯 Glassmorphism 效果類別

### 基本樣式
- `.liquid-glass` - 基礎 Glassmorphism 效果
- `.liquid-glass-card` - 卡片樣式的 Glassmorphism
- `.liquid-glass-panel` - 面板樣式的 Glassmorphism
- `.liquid-glass-button` - 按鈕樣式的 Glassmorphism
- `.liquid-glass-rect` - 矩形 Glassmorphism

### 特殊效果
- `.cfz-liquid-glass-*` - 兼容原有 CFZ 類別名稱

### macOS 風格元件
- `.macos-control-center` - macOS 控制中心樣式
- `.macos-control-item` - 控制中心內部元素
- `.macos-button` - macOS 風格按鈕

## 🚀 快速開始

### 安裝依賴
```bash
npm install
```

### 啟動開發伺服器
```bash
npm run dev
```



## 📁 專案結構

```
├── components/          # React 元件
│   ├── ControlCenter.tsx
│   ├── Dock.tsx
│   ├── HeaderBar.tsx
│   └── DesktopIcons.tsx
├── pages/              # Next.js 頁面
│   ├── index.tsx       # 主頁面
│   └── _document.tsx   # 文件結構
├── styles/             # 樣式檔案
│   └── globals.css     # 全域樣式（包含 liquid glass 效果）
└── public/             # 靜態資源
```

## 🎨 Glassmorphism 效果實作

### 核心技術
- **backdrop-filter** - 30px 強力模糊效果
- **rgba 背景** - 極低透明度白色背景 (0.05)
- **box-shadow** - 深色藍調陰影效果
- **border-radius** - 現代化圓角設計
- **統一設計語言** - 一致的 Glassmorphism 視覺風格

### 使用範例

```tsx
// 基本 Glassmorphism 元素
<div className="liquid-glass p-6">
  <h3>標題</h3>
  <p>內容</p>
</div>

// Glassmorphism 按鈕
<button className="liquid-glass-button px-6 py-3">
  點擊我
</button>

// Glassmorphism 面板
<div className="liquid-glass-panel p-8">
  <h2>玻璃面板</h2>
</div>
```

## 🎯 主要改進

### v2.0 更新內容
- ✅ **移除 CDN 依賴** - 不再依賴 `liquid-glass-like-css` CDN
- ✅ **Glassmorphism 設計** - 採用現代 Glassmorphism 設計趨勢
- ✅ **純粹玻璃質感** - 移除動畫效果，專注於靜態玻璃美感
- ✅ **背景動畫效果** - 新增緩慢的背景視差動畫
- ✅ **統一視覺體驗** - 所有元件採用一致的設計參數
- ✅ **優化效能表現** - 簡化 CSS 提升渲染效能

### 效果特色
- 🌟 **現代 Glassmorphism** - 完美實現流行的玻璃形態設計
- 📐 **極致模糊效果** - 30px 強力背景模糊
- 🎨 **微妙透明質感** - 極低透明度創造精緻效果
- ✨ **深度視覺層次** - 藍調陰影增強立體感
- 🌊 **動態背景視差** - 緩慢的背景動畫營造生動感

## 🔧 技術規格

- **框架**: Next.js 14
- **語言**: TypeScript
- **樣式**: CSS + Tailwind CSS
- **相容性**: 支援現代瀏覽器（Chrome, Firefox, Safari, Edge）
- **效能**: 使用 GPU 加速的 CSS 動畫

## 📖 參考資料

- [CodePen - Liquid Glass Effect](https://codepen.io/Mikhail-Bespalov/pen/MYwrMNy)
- [CSS backdrop-filter](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter)
- [macOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/macos)

## 📄 授權

MIT License

---

**注意**: 此專案完全使用自製的 CSS 實作液體玻璃效果，無需任何外部依賴。所有樣式都經過精心調校，確保在不同裝置和瀏覽器上都能呈現最佳效果。

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