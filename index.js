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

// OpenAPI规范
app.get('/openapi.json', (req, res) => {
  const openapi = {
    "openapi": "3.0.0",
    "info": {
      "title": "剪映小助手 API",
      "description": "视频编辑插件API，支持创建草稿、添加多媒体内容等功能",
      "version": "1.0.0"
    },
    "servers": [
      {
        "url": "https://coze-jianying-assistant-pj7znibmi.vercel.app/api",
        "description": "Production server"
      }
    ],
    "paths": {
      "/create-draft": {
        "post": {
          "summary": "创建视频草稿",
          "description": "创建一个新的视频编辑草稿",
          "operationId": "createDraft",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "height": {
                      "type": "integer",
                      "description": "视频高度",
                      "minimum": 1
                    },
                    "width": {
                      "type": "integer",
                      "description": "视频宽度",
                      "minimum": 1
                    }
                  },
                  "required": ["height", "width"]
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "草稿创建成功",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": { "type": "boolean" },
                      "data": { "type": "object" },
                      "message": { "type": "string" }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/str-array": {
        "post": {
          "summary": "字符串数组转换",
          "description": "将输入字符串转换为数组",
          "operationId": "strArray",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "input": {
                      "type": "string",
                      "description": "输入字符串"
                    }
                  },
                  "required": ["input"]
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "转换成功",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": { "type": "boolean" },
                      "data": { "type": "object" },
                      "message": { "type": "string" }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/audios-timelines": {
        "post": {
          "summary": "音频时间轴处理",
          "description": "处理音频时间轴信息",
          "operationId": "audiosTimelines",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "ids": {
                      "type": "array",
                      "items": { "type": "string" },
                      "description": "音频ID数组"
                    }
                  },
                  "required": ["ids"]
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "处理成功",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": { "type": "boolean" },
                      "data": { "type": "object" },
                      "message": { "type": "string" }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/add-images": {
        "post": {
          "summary": "添加图片",
          "description": "向视频中添加图片素材",
          "operationId": "addImages",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "ids": {
                      "type": "array",
                      "items": { "type": "string" }
                    },
                    "images": {
                      "type": "array",
                      "items": { "type": "string", "format": "uri" }
                    },
                    "timelines": {
                      "type": "array",
                      "items": { "type": "number" }
                    },
                    "height": { "type": "number" },
                    "width": { "type": "number" },
                    "transform_x": { "type": "number" },
                    "transform_y": { "type": "number" },
                    "scale_x": { "type": "number" },
                    "scale_y": { "type": "number" },
                    "in_animation": { "type": "string" },
                    "in_animation_duration": { "type": "number" },
                    "out_animation": { "type": "string" },
                    "out_animation_duration": { "type": "number" }
                  },
                  "required": ["ids", "images", "timelines"]
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "添加成功",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": { "type": "boolean" },
                      "data": { "type": "object" },
                      "message": { "type": "string" }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/add-audios": {
        "post": {
          "summary": "添加音频",
          "description": "向视频中添加音频素材",
          "operationId": "addAudios",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "ids": {
                      "type": "array",
                      "items": { "type": "string" }
                    },
                    "mp3_uris": {
                      "type": "array",
                      "items": { "type": "string", "format": "uri" }
                    },
                    "timelines": {
                      "type": "array",
                      "items": { "type": "number" }
                    },
                    "audio_effect": { "type": "string" },
                    "volume": { "type": "number", "minimum": 0, "maximum": 1 }
                  },
                  "required": ["ids", "mp3_uris", "timelines"]
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "添加成功",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": { "type": "boolean" },
                      "data": { "type": "object" },
                      "message": { "type": "string" }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/add-captions": {
        "post": {
          "summary": "添加字幕",
          "description": "向视频中添加字幕",
          "operationId": "addCaptions",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "ids": {
                      "type": "array",
                      "items": { "type": "string" }
                    },
                    "timelines": {
                      "type": "array",
                      "items": { "type": "number" }
                    },
                    "texts": {
                      "type": "array",
                      "items": { "type": "string" }
                    },
                    "text_color": { "type": "string" },
                    "font": { "type": "string" },
                    "font_size": { "type": "number" },
                    "border": { "type": "boolean" },
                    "border_color": { "type": "string" },
                    "transform_x": { "type": "number" },
                    "transform_y": { "type": "number" },
                    "alignment": { "type": "string" },
                    "line_spacing": { "type": "number" },
                    "letter_spacing": { "type": "number" },
                    "in_animation": { "type": "string" },
                    "in_animation_duration": { "type": "number" },
                    "out_animation": { "type": "string" },
                    "out_animation_duration": { "type": "number" }
                  },
                  "required": ["ids", "timelines", "texts"]
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "添加成功",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": { "type": "boolean" },
                      "data": { "type": "object" },
                      "message": { "type": "string" }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/add-effects": {
        "post": {
          "summary": "添加特效",
          "description": "向视频中添加特效",
          "operationId": "addEffects",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "ids": {
                      "type": "array",
                      "items": { "type": "string" }
                    },
                    "timelines": {
                      "type": "array",
                      "items": { "type": "number" }
                    },
                    "effects": {
                      "type": "array",
                      "items": { "type": "string" }
                    }
                  },
                  "required": ["ids", "timelines", "effects"]
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "添加成功",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": { "type": "boolean" },
                      "data": { "type": "object" },
                      "message": { "type": "string" }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/add-videos": {
        "post": {
          "summary": "添加视频",
          "description": "向项目中添加视频素材",
          "operationId": "addVideos",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "ids": {
                      "type": "array",
                      "items": { "type": "string" }
                    },
                    "timelines": {
                      "type": "array",
                      "items": { "type": "number" }
                    },
                    "video_uris": {
                      "type": "array",
                      "items": { "type": "string", "format": "uri" }
                    },
                    "volume": { "type": "number", "minimum": 0, "maximum": 1 },
                    "scale_x": { "type": "number" },
                    "scale_y": { "type": "number" },
                    "transform_x": { "type": "number" },
                    "transform_y": { "type": "number" }
                  },
                  "required": ["ids", "timelines", "video_uris"]
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "添加成功",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": { "type": "boolean" },
                      "data": { "type": "object" },
                      "message": { "type": "string" }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };

  res.setHeader('Content-Type', 'application/json');
  res.json(openapi);
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
