export const APPLICATION_CATALOG = [
  {
    id: 'rural-seasons',
    number: '01',
    category: '规划',
    status: 'LIVE',
    shortLabel: '乡村四季',
    kicker: 'APPLICATION CASE / RURAL SANDBOX',
    title: '把乡村变成可观察的规划空间',
    copy: '一片地形、一条道路和一组村屋，先组成一个可观察的空间，再用季节、天气和太阳位置回答农业规划与乡村建设问题。',
    valueTitle: '农业规划 / 乡村旅游 / 建设展示',
    valueCopy: '让人从“看一张图”进入“在空间里判断”：农田在哪里，村路怎样连接，季节和天气如何改变场景。',
    owner: 'procedural terrain + rural composition',
    metrics: [['WORLD GRID', '48 × 36'], ['SCENE OBJECTS', '180+'], ['WEATHER STATES', '04'], ['CAMERA VIEWS', '03']],
    stages: [
      { id: 'terrain', number: '01', label: '地形底座', title: '先让乡村有一块真实的地面', copy: '高度场先建立坡地、低洼处和河谷，所有道路、农田和建筑都以它为参照。', input: 'height field / slope / river', gpu: 'procedural terrain mesh' },
      { id: 'fields', number: '02', label: '农田道路', title: '把生产关系铺到地表', copy: '农田、田埂、土路和水渠沿着地形展开，作物行距由可复现的 seed 决定。', input: 'field patches / crop rows', gpu: 'instanced crops + paths' },
      { id: 'settlement', number: '03', label: '村落聚合', title: '让村屋和树木形成空间记忆', copy: '房屋、仓库、树带和路灯共同建立乡村的尺度参照，近处的物体承担空间深度。', input: 'house seed / canopy / road', gpu: 'grouped meshes + shadows' },
      { id: 'weather', number: '04', label: '天气光照', title: '用季节和天气改变同一片土地', copy: '季节切换颜色、植被和积雪，时间控制太阳高度，雨雾则改变空气层次。', input: 'season / time / weather', gpu: 'lighting + fog + particles' },
      { id: 'final', number: '05', label: '规划合成', title: '最后把它变成可讨论的空间', copy: '一张持续可拖动的 3D 沙盘，把景观、生产和建设关系放在同一视野里。', input: 'scene / camera / context', gpu: 'spatial stage composite' },
    ],
  },
  {
    id: 'rural-storm',
    number: '02',
    category: '巡检',
    status: 'LIVE',
    shortLabel: '暴雨巡检',
    kicker: 'APPLICATION CASE / STORM INSPECTION',
    title: '把一场暴雨变成可以执行的巡检任务',
    copy: '在同一片乡村底座上叠加雨幕、积水、湿路、探照灯和任务点，让天气风险变成一条可以观察和执行的路线。',
    valueTitle: '灾害演练 / 应急管理 / 设施巡检',
    valueCopy: '重点不是“雨下得多漂亮”，而是让人看见哪里可能积水、哪条路需要检查，以及任务如何被完成。',
    owner: 'precipitation + wet surfaces + task route',
    metrics: [['RAIN LAYERS', '02'], ['INSPECTION POINTS', '04'], ['WET SURFACES', '06'], ['ROUTE NODES', '08']],
    stages: [
      { id: 'terrain', number: '01', label: '地形底座', title: '先找出水会往哪里走', copy: '低洼地形、河谷和道路坡度决定了后续积水与巡检路线。', input: 'slope / lowland / bridge', gpu: 'terrain height field' },
      { id: 'fields', number: '02', label: '设施关系', title: '把风险相关的设施放进空间', copy: '房屋、桥梁、电箱和农田排水口成为需要检查的真实对象。', input: 'houses / drains / facilities', gpu: 'spatial anchors + route graph' },
      { id: 'settlement', number: '03', label: '巡检路线', title: '从空间关系生成一条任务路线', copy: '路线节点沿道路和桥梁展开，任务点用脉冲标记保持可识别。', input: 'waypoints / route / light', gpu: 'line path + marker meshes' },
      { id: 'weather', number: '04', label: '暴雨积水', title: '让天气真正改变可通行性', copy: '远近两层雨幕、湿地材质和积水区域同时出现，照明也转为探照灯和闪电氛围。', input: 'rain / puddle / flashlight', gpu: 'particles + wet material' },
      { id: 'final', number: '05', label: '巡检合成', title: '把天气场景变成一个可执行任务', copy: '最终画面同时保留村落空间、雨幕、积水、路线和任务点，适合演练与讲解。', input: 'mission / camera / feedback', gpu: 'application composite' },
    ],
  },
  {
    id: 'rural-game', number: '03', category: '游戏', status: 'LIVE', shortLabel: '夜雨调查', kicker: 'APPLICATION CASE / NIGHT RAIN MISSION', title: '在暴雨夜里完成一次乡村调查', copy: '从村口安全点出发，检查排水口、重启泵站、标记受阻道路，收集应急物资后再返回救援灯标。', valueTitle: '可完成的 Three.js 游戏关卡', valueCopy: '场景效果开始影响玩法：积水会减速并提高风险，电池会改善照明，路线图会显现返程路径，任务最终形成完整闭环。', owner: 'authored level + hazard state + mission loop', metrics: [['PLAYER', '01'], ['INVESTIGATIONS', '03'], ['HAZARD ZONES', '02'], ['SUPPLIES', '02']], stages: [
      { id: 'terrain', number: '01', label: '夜雨底座', title: '先把乡村变成一个可进入的暴雨夜', copy: '乡村仍使用单一水平游戏平面，地形、村路和房屋负责方向感，夜色、暴雨和湿地负责风险氛围。', input: 'terrain / night / rain', gpu: 'shared rural world' },
      { id: 'route', number: '02', label: '调查路线', title: '让出发、调查和返回形成闭环', copy: '路线从村口安全点经过三个调查点和两件应急物资，最后回到同一个救援灯标，不把玩家丢在地图另一端。', input: 'route / anchors / return', gpu: 'authored level graph' },
      { id: 'collision', number: '03', label: '碰撞危险', title: '让建筑和积水真正改变移动', copy: '房屋碰撞与视觉模型分离；积水危险区会降低速度并提高暴雨风险，风险过高时安全返回村口而不丢失进度。', input: 'colliders / hazard zones', gpu: 'flat collision + risk pass' },
      { id: 'mission', number: '04', label: '调查物资', title: '让任务、物资和环境互相影响', copy: '调查按顺序推进；路线图强化返程路线，备用电池增强照明并降低积水风险增长。', input: 'investigation / supplies / feedback', gpu: 'stateful interaction' },
      { id: 'final', number: '05', label: '完成闭环', title: '把视觉场景变成一个可以完成的关卡', copy: '玩家必须完成三项调查、带回两件物资并返回村口灯标；移动、风险、任务、反馈和重置形成完整游戏循环。', input: 'player / weather / mission', gpu: 'playable spatial composite' },
    ]
  },
  {
    id: 'park-twin', number: '04', category: '运营', status: 'LIVE', shortLabel: '园区孪生', kicker: 'APPLICATION CASE / SITE TWIN', title: '把小区和园区变成日常运营空间', copy: '在一张可旋转的园区地图上组合建筑、道路、绿化、天气和摄像头视角，先理解空间，再接入真实运营数据。', valueTitle: '物业管理 / 园区展示 / 空间导览', valueCopy: '空间孪生的第一步不是堆更多模型，而是让建筑、道路、绿化和巡检视角各自成为可切换、可讨论的图层。', owner: 'site layers + camera routes', metrics: [['BUILDINGS', '05'], ['CAMERAS', '03'], ['LAYERS', '05'], ['WEATHER', '04']], stages: [
      { id: 'site', number: '01', label: '场地底座', title: '先让园区有一块可定位的地面', copy: '地块、边界和基础广场先建立空间坐标，后续建筑、道路和绿化都挂在同一张园区底图上。', input: 'site boundary / plaza', gpu: 'procedural site mesh' },
      { id: 'circulation', number: '02', label: '道路关系', title: '把主路和入口变成导览骨架', copy: '主门、环路、中央道路和中庭形成园区的交通关系，摄像头路线沿着这些空间节点展开。', input: 'roads / gate / route', gpu: 'circulation meshes' },
      { id: 'architecture', number: '03', label: '建筑体块', title: '用建筑体块建立运营尺度', copy: '办公楼、服务楼、活动厅和中央服务中心共同建立远近层次，窗光和入口说明建筑的使用状态。', input: 'buildings / entrances', gpu: 'grouped building meshes' },
      { id: 'operations', number: '04', label: '绿化摄像头', title: '把日常运营对象放进空间', copy: '绿地、树木、水景和摄像头节点成为可以切换的运营图层，导览不再只是一张静态平面图。', input: 'greenery / cameras / water', gpu: 'layer visibility + markers' },
      { id: 'final', number: '05', label: '孪生合成', title: '在天气和视角中理解园区', copy: '最终状态保留园区关系、摄像头路线和天气变化，成为物业展示、空间导览和后续数据接入的原型。', input: 'layers / weather / views', gpu: 'site twin composite' },
    ]
  },
  {
    id: 'camping-route', number: '05', category: '生活', status: 'LIVE', shortLabel: '出行预演', kicker: 'APPLICATION CASE / OUTDOOR PLANNER', title: '在出发前先走一遍天气和路线', copy: '把天气、地形、太阳位置和营地布置放进同一片乡村空间，在出发前先走一遍路线和落脚点。', valueTitle: '日常出行 / 旅行规划', valueCopy: '把“天气适不适合去”转成一个可感知的空间决策：哪里适合扎营，哪条路更舒服，太阳会从哪里落下。', owner: 'terrain + weather + route', metrics: [['WEATHER', '05'], ['CAMPSITES', '01'], ['ROUTE NODES', '08'], ['SUN PATH', '01']], stages: [
      { id: 'terrain', number: '01', label: '地形筛选', title: '先找到一块适合停留的地面', copy: '坡度、河流和道路先组成出行判断的底图，营地不再是浮在画面上的贴图。', input: 'slope / river / access', gpu: 'terrain suitability pass' },
      { id: 'route', number: '02', label: '路线规划', title: '把出发点和营地连成一条路', copy: '路线沿着道路、河岸和视野展开，镜头可以从总览进入农田与营地之间。', input: 'trail / nodes / distance', gpu: 'curve route + camera path' },
      { id: 'camp', number: '03', label: '营地布置', title: '把帐篷、火堆和停留点放进空间', copy: '营地、火堆、桌椅和照明形成可读的停留尺度，地面接触和周边植被共同说明位置。', input: 'tent / fire / rest point', gpu: 'grouped props + point light' },
      { id: 'weather', number: '04', label: '天气预演', title: '让天气成为出行决策的一部分', copy: '晴天、阴天、雾和降雪会改变能见度、色温和场景情绪，时间滑杆同步改变太阳位置。', input: 'weather / time / visibility', gpu: 'sky + fog + particles' },
      { id: 'final', number: '05', label: '出行合成', title: '在出发前记住这条路', copy: '最终画面保留路线、营地、河流和天气状态，成为可以讨论和复盘的出行预演。', input: 'route / camp / context', gpu: 'outdoor planning composite' },
    ]
  },
  {
    id: 'night-story', number: '06', category: '叙事', status: 'LIVE', shortLabel: '夜村故事', kicker: 'APPLICATION CASE / NIGHT STORY', title: '让月光、萤火虫和路径讲故事', copy: '同一片乡村在夜里变成另一种空间：灯光负责引路，萤火虫负责呼吸，镜头负责把人带进故事。', valueTitle: '互动叙事 / 短片 / 游戏关卡', valueCopy: '夜间场景可以先作为可观察的情绪空间，再叠加事件触发、角色移动和关卡目标。', owner: 'night lighting + story camera', metrics: [['MOONLIGHT', '01'], ['FIREFLIES', '36'], ['LANTERNS', '06'], ['STORY NODES', '04']], stages: [
      { id: 'dusk', number: '01', label: '黄昏转场', title: '先让白天慢慢退到远处', copy: '时间从黄昏进入夜晚，太阳光减弱，村屋窗光和月光开始承担空间层次。', input: 'time / sun / windows', gpu: 'night transition lighting' },
      { id: 'path', number: '02', label: '灯光路径', title: '让一条小路成为叙事线索', copy: '灯笼、屋檐和村路形成一条可跟随的视觉路径，远处的村屋保持低亮度。', input: 'lantern / path / house', gpu: 'emissive anchors + route' },
      { id: 'fireflies', number: '03', label: '萤火呼吸', title: '再加入会呼吸的微小生命', copy: '萤火虫以不同节奏闪烁，分布在水渠、树带和路边，给黑夜一个可停留的尺度。', input: 'particle field / pulse', gpu: 'points + time pulse' },
      { id: 'mist', number: '04', label: '月光薄雾', title: '让远处的空间开始消失', copy: '薄雾和月光把村落分成近、中、远三层，故事路径因此有了方向和未知。', input: 'moon / fog / depth', gpu: 'atmosphere + depth fade' },
      { id: 'final', number: '05', label: '故事合成', title: '最后把空间交给一条路', copy: '最终状态保留月光、灯笼、萤火虫和村屋，适合继续接入镜头事件和互动叙事。', input: 'light / path / event', gpu: 'night story composite' },
    ]
  },
];

export function getApplication(id) {
  return APPLICATION_CATALOG.find((application) => application.id === id) ?? APPLICATION_CATALOG[0];
}

export function isLiveApplication(application) {
  return application.status === 'LIVE';
}
