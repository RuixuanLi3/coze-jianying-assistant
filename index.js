const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// 导入路由
const videoEditingRoutes = require('./routes/videoEditing');

// 使用路由
app.use('/api', videoEditingRoutes);

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: '剪映小助手插件运行正常' });
});

// 根路径
app.get('/', (req, res) => {
  res.json({
    name: '剪映小助手',
    version: '1.0.0',
    description: 'Coze平台视频编辑插件',
    endpoints: [
      '/api/create-draft',
      '/api/str-array',
      '/api/audios-timelines',
      '/api/add-images',
      '/api/add-audios',
      '/api/add-captions',
      '/api/add-effects',
      '/api/add-videos'
    ]
  });
});

// 错误处理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// 404处理
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: '请求的端点不存在'
  });
});

app.listen(PORT, () => {
  console.log(`剪映小助手插件服务器运行在端口 ${PORT}`);
});