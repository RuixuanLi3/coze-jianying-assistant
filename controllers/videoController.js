const { v4: uuidv4 } = require('uuid');
const Joi = require('joi');

// 数据验证schemas
const schemas = {
  createDraft: Joi.object({
    height: Joi.number().integer().min(1).required(),
    width: Joi.number().integer().min(1).required()
  }),

  strArray: Joi.object({
    input: Joi.string().required()
  }),

  addImages: Joi.object({
    ids: Joi.array().items(Joi.string()).required(),
    images: Joi.array().items(Joi.string().uri()).required(),
    timelines: Joi.array().items(Joi.number()).required(),
    height: Joi.number().min(0),
    width: Joi.number().min(0),
    transform_x: Joi.number(),
    transform_y: Joi.number(),
    scale_x: Joi.number().min(0),
    scale_y: Joi.number().min(0),
    in_animation: Joi.string(),
    in_animation_duration: Joi.number().min(0),
    out_animation: Joi.string(),
    out_animation_duration: Joi.number().min(0)
  }),

  addAudios: Joi.object({
    ids: Joi.array().items(Joi.string()).required(),
    mp3_uris: Joi.array().items(Joi.string().uri()).required(),
    timelines: Joi.array().items(Joi.number()).required(),
    audio_effect: Joi.string(),
    volume: Joi.number().min(0).max(1)
  }),

  addCaptions: Joi.object({
    ids: Joi.array().items(Joi.string()).required(),
    timelines: Joi.array().items(Joi.number()).required(),
    texts: Joi.array().items(Joi.string()).required(),
    text_color: Joi.string(),
    font: Joi.string(),
    font_size: Joi.number().min(1),
    border: Joi.boolean(),
    border_color: Joi.string(),
    transform_x: Joi.number(),
    transform_y: Joi.number(),
    alignment: Joi.string(),
    line_spacing: Joi.number(),
    letter_spacing: Joi.number(),
    in_animation: Joi.string(),
    in_animation_duration: Joi.number().min(0),
    out_animation: Joi.string(),
    out_animation_duration: Joi.number().min(0)
  }),

  addEffects: Joi.object({
    ids: Joi.array().items(Joi.string()).required(),
    timelines: Joi.array().items(Joi.number()).required(),
    effects: Joi.array().items(Joi.string()).required()
  }),

  addVideos: Joi.object({
    ids: Joi.array().items(Joi.string()).required(),
    timelines: Joi.array().items(Joi.number()).required(),
    video_uris: Joi.array().items(Joi.string().uri()).required(),
    volume: Joi.number().min(0).max(1),
    scale_y: Joi.number().min(0),
    scale_x: Joi.number().min(0),
    transform_x: Joi.number(),
    transform_y: Joi.number()
  })
};

class VideoController {
  // 创建草稿
  async createDraft(req, res) {
    try {
      const { error, value } = schemas.createDraft.validate(req.body);
      if (error) {
        return res.status(400).json({
          error: 'Validation Error',
          message: error.details[0].message
        });
      }

      const { height, width } = value;
      const draftId = uuidv4();

      // 模拟创建草稿逻辑
      const result = {
        ids: [draftId],
        height,
        width,
        created_at: new Date().toISOString(),
        status: 'created'
      };

      res.json({
        success: true,
        data: result,
        message: '草稿创建成功'
      });
    } catch (error) {
      res.status(500).json({
        error: 'Internal Server Error',
        message: error.message
      });
    }
  }

  // 字符串数组处理
  async strArray(req, res) {
    try {
      const { error, value } = schemas.strArray.validate(req.body);
      if (error) {
        return res.status(400).json({
          error: 'Validation Error',
          message: error.details[0].message
        });
      }

      const { input } = value;

      // 将输入字符串转换为数组（按逗号分割）
      const array = input.split(',').map(item => item.trim()).filter(item => item.length > 0);

      res.json({
        success: true,
        data: {
          input,
          output: array
        },
        message: '字符串数组转换成功'
      });
    } catch (error) {
      res.status(500).json({
        error: 'Internal Server Error',
        message: error.message
      });
    }
  }

  // 音频时间轴处理
  async audiosTimelines(req, res) {
    try {
      const { ids } = req.body;

      if (!ids || !Array.isArray(ids)) {
        return res.status(400).json({
          error: 'Validation Error',
          message: 'ids字段必须是数组'
        });
      }

      // 模拟生成音频时间轴
      const timelines = ids.map(() => Math.floor(Math.random() * 1000));

      res.json({
        success: true,
        data: {
          ids,
          timelines,
          message: '使用现有的时间轴获取Get_Timelines'
        }
      });
    } catch (error) {
      res.status(500).json({
        error: 'Internal Server Error',
        message: error.message
      });
    }
  }

  // 添加图片
  async addImages(req, res) {
    try {
      const { error, value } = schemas.addImages.validate(req.body);
      if (error) {
        return res.status(400).json({
          error: 'Validation Error',
          message: error.details[0].message
        });
      }

      const {
        ids,
        images,
        timelines,
        height = 1080,
        width = 1920,
        transform_x = 0,
        transform_y = 0,
        scale_x = 1,
        scale_y = 1,
        in_animation = 'none',
        in_animation_duration = 0,
        out_animation = 'none',
        out_animation_duration = 0
      } = value;

      // 验证数组长度一致性
      if (ids.length !== images.length || ids.length !== timelines.length) {
        return res.status(400).json({
          error: 'Validation Error',
          message: 'ids、images和timelines数组长度必须一致'
        });
      }

      const result = {
        added_images: ids.map((id, index) => ({
          id,
          image_uri: images[index],
          timeline: timelines[index],
          properties: {
            height,
            width,
            transform: { x: transform_x, y: transform_y },
            scale: { x: scale_x, y: scale_y },
            animations: {
              in: { type: in_animation, duration: in_animation_duration },
              out: { type: out_animation, duration: out_animation_duration }
            }
          }
        }))
      };

      res.json({
        success: true,
        data: result,
        message: '图片添加成功'
      });
    } catch (error) {
      res.status(500).json({
        error: 'Internal Server Error',
        message: error.message
      });
    }
  }

  // 添加音频
  async addAudios(req, res) {
    try {
      const { error, value } = schemas.addAudios.validate(req.body);
      if (error) {
        return res.status(400).json({
          error: 'Validation Error',
          message: error.details[0].message
        });
      }

      const {
        ids,
        mp3_uris,
        timelines,
        audio_effect = 'none',
        volume = 1.0
      } = value;

      // 验证数组长度一致性
      if (ids.length !== mp3_uris.length || ids.length !== timelines.length) {
        return res.status(400).json({
          error: 'Validation Error',
          message: 'ids、mp3_uris和timelines数组长度必须一致'
        });
      }

      const result = {
        added_audios: ids.map((id, index) => ({
          id,
          audio_uri: mp3_uris[index],
          timeline: timelines[index],
          properties: {
            effect: audio_effect,
            volume
          }
        }))
      };

      res.json({
        success: true,
        data: result,
        message: '音频添加成功'
      });
    } catch (error) {
      res.status(500).json({
        error: 'Internal Server Error',
        message: error.message
      });
    }
  }

  // 添加字幕
  async addCaptions(req, res) {
    try {
      const { error, value } = schemas.addCaptions.validate(req.body);
      if (error) {
        return res.status(400).json({
          error: 'Validation Error',
          message: error.details[0].message
        });
      }

      const {
        ids,
        timelines,
        texts,
        text_color = '#FFFFFF',
        font = 'Arial',
        font_size = 24,
        border = false,
        border_color = '#000000',
        transform_x = 0,
        transform_y = 0,
        alignment = 'center',
        line_spacing = 1.2,
        letter_spacing = 0,
        in_animation = 'none',
        in_animation_duration = 0,
        out_animation = 'none',
        out_animation_duration = 0
      } = value;

      // 验证数组长度一致性
      if (ids.length !== timelines.length || ids.length !== texts.length) {
        return res.status(400).json({
          error: 'Validation Error',
          message: 'ids、timelines和texts数组长度必须一致'
        });
      }

      const result = {
        added_captions: ids.map((id, index) => ({
          id,
          text: texts[index],
          timeline: timelines[index],
          style: {
            color: text_color,
            font,
            size: font_size,
            border: border ? { enabled: true, color: border_color } : { enabled: false },
            position: { x: transform_x, y: transform_y },
            alignment,
            spacing: { line: line_spacing, letter: letter_spacing }
          },
          animations: {
            in: { type: in_animation, duration: in_animation_duration },
            out: { type: out_animation, duration: out_animation_duration }
          }
        }))
      };

      res.json({
        success: true,
        data: result,
        message: '字幕添加成功'
      });
    } catch (error) {
      res.status(500).json({
        error: 'Internal Server Error',
        message: error.message
      });
    }
  }

  // 添加特效
  async addEffects(req, res) {
    try {
      const { error, value } = schemas.addEffects.validate(req.body);
      if (error) {
        return res.status(400).json({
          error: 'Validation Error',
          message: error.details[0].message
        });
      }

      const { ids, timelines, effects } = value;

      // 验证数组长度一致性
      if (ids.length !== timelines.length || ids.length !== effects.length) {
        return res.status(400).json({
          error: 'Validation Error',
          message: 'ids、timelines和effects数组长度必须一致'
        });
      }

      const result = {
        added_effects: ids.map((id, index) => ({
          id,
          effect_type: effects[index],
          timeline: timelines[index],
          properties: {
            intensity: 1.0,
            duration: 1000
          }
        }))
      };

      res.json({
        success: true,
        data: result,
        message: '特效添加成功'
      });
    } catch (error) {
      res.status(500).json({
        error: 'Internal Server Error',
        message: error.message
      });
    }
  }

  // 添加视频
  async addVideos(req, res) {
    try {
      const { error, value } = schemas.addVideos.validate(req.body);
      if (error) {
        return res.status(400).json({
          error: 'Validation Error',
          message: error.details[0].message
        });
      }

      const {
        ids,
        timelines,
        video_uris,
        volume = 1.0,
        scale_x = 1,
        scale_y = 1,
        transform_x = 0,
        transform_y = 0
      } = value;

      // 验证数组长度一致性
      if (ids.length !== timelines.length || ids.length !== video_uris.length) {
        return res.status(400).json({
          error: 'Validation Error',
          message: 'ids、timelines和video_uris数组长度必须一致'
        });
      }

      const result = {
        added_videos: ids.map((id, index) => ({
          id,
          video_uri: video_uris[index],
          timeline: timelines[index],
          properties: {
            volume,
            scale: { x: scale_x, y: scale_y },
            transform: { x: transform_x, y: transform_y }
          }
        }))
      };

      res.json({
        success: true,
        data: result,
        message: '视频添加成功'
      });
    } catch (error) {
      res.status(500).json({
        error: 'Internal Server Error',
        message: error.message
      });
    }
  }
}

module.exports = new VideoController();