# 剪映小助手 - Coze平台插件

这是一个为Coze平台开发的视频编辑插件，提供完整的视频制作功能。

## 功能特性

- ✨ **创建草稿** - 创建视频编辑项目草稿
- 🔤 **字符串处理** - 字符串到数组的转换功能
- 🎵 **音频管理** - 音频时间轴处理和添加功能
- 🖼️ **图片处理** - 支持图片添加、变换、动画效果
- 🎬 **视频编辑** - 视频素材添加和属性调整
- 📝 **字幕功能** - 支持字幕添加、样式设置和动画
- ✨ **特效系统** - 多种视频特效支持

## API接口

### 1. 创建草稿
```http
POST /api/create-draft
Content-Type: application/json

{
  "height": 1080,
  "width": 1920
}
```

### 2. 字符串数组转换
```http
POST /api/str-array
Content-Type: application/json

{
  "input": "item1,item2,item3"
}
```

### 3. 音频时间轴处理
```http
POST /api/audios-timelines
Content-Type: application/json

{
  "ids": ["audio1", "audio2"]
}
```

### 4. 添加图片
```http
POST /api/add-images
Content-Type: application/json

{
  "ids": ["img1", "img2"],
  "images": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
  "timelines": [0, 1000],
  "height": 1080,
  "width": 1920,
  "transform_x": 0,
  "transform_y": 0,
  "scale_x": 1,
  "scale_y": 1,
  "in_animation": "fadeIn",
  "in_animation_duration": 500,
  "out_animation": "fadeOut",
  "out_animation_duration": 500
}
```

### 5. 添加音频
```http
POST /api/add-audios
Content-Type: application/json

{
  "ids": ["audio1", "audio2"],
  "mp3_uris": ["https://example.com/audio1.mp3", "https://example.com/audio2.mp3"],
  "timelines": [0, 5000],
  "audio_effect": "echo",
  "volume": 0.8
}
```

### 6. 添加字幕
```http
POST /api/add-captions
Content-Type: application/json

{
  "ids": ["caption1", "caption2"],
  "timelines": [0, 2000],
  "texts": ["第一条字幕", "第二条字幕"],
  "text_color": "#FFFFFF",
  "font": "Arial",
  "font_size": 24,
  "border": true,
  "border_color": "#000000",
  "transform_x": 0,
  "transform_y": -100,
  "alignment": "center",
  "line_spacing": 1.2,
  "letter_spacing": 0,
  "in_animation": "slideUp",
  "in_animation_duration": 300,
  "out_animation": "slideDown",
  "out_animation_duration": 300
}
```

### 7. 添加特效
```http
POST /api/add-effects
Content-Type: application/json

{
  "ids": ["effect1", "effect2"],
  "timelines": [1000, 3000],
  "effects": ["blur", "sharpen"]
}
```

### 8. 添加视频
```http
POST /api/add-videos
Content-Type: application/json

{
  "ids": ["video1", "video2"],
  "timelines": [0, 10000],
  "video_uris": ["https://example.com/video1.mp4", "https://example.com/video2.mp4"],
  "volume": 1.0,
  "scale_x": 1,
  "scale_y": 1,
  "transform_x": 0,
  "transform_y": 0
}
```

## 安装和运行

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

3. 启动生产服务器：
```bash
npm start
```

## 部署到Coze平台

1. 确保你的服务器可以通过HTTPS访问
2. 更新 `coze-plugin.json` 中的URL配置
3. 更新 `openapi.json` 中的服务器地址
4. 在Coze平台中导入插件配置

## 项目结构

```
├── index.js                 # 主入口文件
├── package.json            # 项目配置
├── coze-plugin.json        # Coze插件配置
├── openapi.json           # OpenAPI规范
├── controllers/
│   └── videoController.js  # 视频编辑控制器
├── routes/
│   └── videoEditing.js     # 路由配置
├── utils/                  # 工具函数
└── config/                # 配置文件
```

## 技术栈

- Node.js + Express.js
- Joi数据验证
- UUID生成
- CORS跨域支持
- Helmet安全中间件

## 许可证

MIT License