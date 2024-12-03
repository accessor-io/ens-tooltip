```markdown:README.md
# ENS Tooltip 🔍

[![npm version](https://img.shields.io/npm/v/ens-tooltip.svg)](https://www.npmjs.com/package/ens-tooltip)
[![license](https://img.shields.io/npm/l/ens-tooltip.svg)](https://github.com/acessor-io/ens-tooltip/blob/main/LICENSE)
[![downloads](https://img.shields.io/npm/dm/ens-tooltip.svg)](https://www.npmjs.com/package/ens-tooltip)

A powerful, customizable ENS profile tooltip for web applications that displays Ethereum Name Service profile information on hover. Perfect for dApps, wallets, and Web3 applications.

## ✨ Features

- 🎯 **Lightweight** - Zero dependencies, minimal bundle size
- 🎨 **Customizable** - Fully themeable with CSS-in-JS
- ⚡ **Performance** - Built-in caching and lazy loading
- 🔌 **Framework Agnostic** - Works with React, Vue, and vanilla JS
- 🌐 **ENS Support** - Full ENS metadata and avatar support
- 📱 **Responsive** - Mobile-friendly and accessible

## 📦 Installation

```bash
# Using npm
npm install ens-tooltip

# Using yarn
yarn add ens-tooltip

# Using pnpm
pnpm add ens-tooltip
```

## 🚀 Quick Start

### React
```typescript
import { ENSTooltip } from 'ens-tooltip';

function App() {
  return (
    <ENSTooltip 
      address="vitalik.eth"
      placement="top"
      theme="dark"
    >
      <span>Hover me!</span>
    </ENSTooltip>
  );
}
```

### Vue
```vue
<template>
  <ENSTooltip 
    address="vitalik.eth"
    placement="top"
    :theme="{ mode: 'dark' }"
  >
    <span>Hover me!</span>
  </ENSTooltip>
</template>

<script>
import { ENSTooltip } from 'ens-tooltip/vue';

export default {
  components: { ENSTooltip }
}
</script>
```

## ⚙️ Configuration

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `address` | `string` | Required | ENS name or Ethereum address |
| `children` | `ReactNode` | Required | Content to trigger the tooltip |
| `theme` | `object \| 'light' \| 'dark'` | `'light'` | Styling options |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | Tooltip position |
| `cacheTime` | `number` | `300000` | Cache duration (ms) |
| `disabled` | `boolean` | `false` | Disable tooltip |
| `onFetch` | `(data: ENSData) => void` | - | Callback when ENS data is fetched |

### Theming

Customize the appearance with the theme prop:

```typescript
const customTheme = {
  background: '#1a1b1f',
  text: '#ffffff',
  border: '1px solid #2d2f36',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  // Add custom CSS properties
}

<ENSTooltip theme={customTheme}>
  <span>Custom themed tooltip</span>
</ENSTooltip>
```

## 📱 Responsive Design

The tooltip automatically adjusts for mobile devices:

```typescript
<ENSTooltip 
  address="vitalik.eth"
  responsive={{
    mobile: {
      placement: 'bottom',
      offset: 8,
    },
    tablet: {
      placement: 'right',
      offset: 12,
    }
  }}
>
  <span>Responsive tooltip</span>
</ENSTooltip>
```

## 🔄 Cache Management

Control caching behavior:

```typescript
<ENSTooltip 
  address="vitalik.eth"
  cacheTime={600000} // 10 minutes
  cacheKey="custom-key"
  onCacheHit={(data) => console.log('Cache hit:', data)}
>
  <span>Cached tooltip</span>
</ENSTooltip>
```

## 🎨 Styling Examples

### Glass Effect
```css
.ens-tooltip-glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
}
```

### Neon Effect
```css
.ens-tooltip-neon {
  background: #000;
  border: 1px solid #0ff;
  box-shadow: 0 0 10px #0ff;
  color: #fff;
}
```

## 🔧 Advanced Usage

### Custom Loading States
```typescript
<ENSTooltip
  address="vitalik.eth"
  loadingComponent={<CustomSpinner />}
  errorComponent={<ErrorMessage />}
>
  <span>Advanced tooltip</span>
</ENSTooltip>
```

### Event Handling
```typescript
<ENSTooltip
  address="vitalik.eth"
  onOpen={() => console.log('Tooltip opened')}
  onClose={() => console.log('Tooltip closed')}
  onError={(error) => console.error('Error:', error)}
>
  <span>Event handling</span>
</ENSTooltip>
```

## 🤝 Contributing

We love your input! Here's how you can contribute:

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/amazing`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing`)
5. Open a Pull Request

Please read our [Contributing Guide](CONTRIBUTING.md) for more details.

## 📄 License

MIT © [accessor.eth]

## 🙋‍♂️ Support

- Create an [Issue](https://github.com/acessor-io/ens-tooltip/issues)
- Follow me on [Twitter](https://twitter.com/ioevno)

