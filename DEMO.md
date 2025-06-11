# 🎯 專案演示指南

## 🚀 快速開始

1. **查看開機畫面**
   - 訪問：`http://localhost:3000/boot`
   - 觀察 Apple Logo 和進度條動畫
   - 3秒後自動跳轉至主桌面

2. **探索主桌面**
   - 訪問：`http://localhost:3000`
   - 欣賞液態玻璃質感背景
   - 測試控制中心和 Dock 互動

## 🎨 設計亮點

### 液態玻璃效果
- 使用 `backdrop-blur-xl` 實現毛玻璃效果
- `bg-white/10` 提供半透明背景
- `border-white/20` 增加邊框層次感

### 動畫系統
- **開機動畫**：進度條使用 `animate-load` 自定義動畫
- **淡入效果**：Headless UI Transition 實現元件淡入
- **懸停效果**：`hover:scale-105` 提供微妙的縮放反饋

### 互動元素
- **控制中心**：WiFi、藍牙狀態切換
- **滑桿控制**：亮度和音量調節
- **Dock 懸停**：圖標縮放和工具提示

## 📱 響應式設計

- 適配桌面和平板裝置
- 控制中心在小螢幕上自動調整位置
- Dock 保持底部居中對齊

## 🛠️ 客製化建議

### 背景更換
```typescript
// 在 pages/index.tsx 中修改背景 URL
backgroundImage: 'url(YOUR_IMAGE_URL)'
```

### 色彩主題
```javascript
// 在 tailwind.config.js 中添加自定義色彩
colors: {
  primary: '#007AFF',
  secondary: '#5856D6'
}
```

### 動畫調整
```javascript
// 修改動畫持續時間
animation: {
  load: 'load 5s ease-in-out forwards', // 改為 5 秒
}
```

## 🎪 特效展示

1. **開機序列**：模擬真實 macOS 開機體驗
2. **控制中心**：完整的系統控制面板
3. **Dock 互動**：應用程式啟動器效果
4. **背景模糊**：層次分明的視覺深度

---

享受您的 macOS 風格桌面體驗！ 🍎✨ 