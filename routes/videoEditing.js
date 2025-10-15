const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

// 创建草稿
router.post('/create-draft', videoController.createDraft);

// 字符串数组处理
router.post('/str-array', videoController.strArray);

// 音频时间轴处理
router.post('/audios-timelines', videoController.audiosTimelines);

// 添加图片
router.post('/add-images', videoController.addImages);

// 添加音频
router.post('/add-audios', videoController.addAudios);

// 添加字幕
router.post('/add-captions', videoController.addCaptions);

// 添加特效
router.post('/add-effects', videoController.addEffects);

// 添加视频
router.post('/add-videos', videoController.addVideos);

module.exports = router;