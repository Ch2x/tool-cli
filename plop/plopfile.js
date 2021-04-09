module.exports = function (plop) {
  plop.setGenerator('view', { // 这里的 test 是一个自己设定的名字，在执行命令行的时候会用到
    description: 'generate a view', // 这里是对这个plop的功能描述
    prompts: [{
      type: 'input', // 问题的类型
      name: 'name', // 问题对应得到答案的变量名，可以在actions中使用该变量
      message: 'view name please', // 在命令行中的问题
      default: 'test' // 问题的默认答案
    }],
    actions: data => {
      const {
        name
      } = data;
      const actions = [{
        type: 'add', // 操作类型，这里是添加文件
        path: `src/views/${name}/index.vue`, // 模板生成的路径
        templateFile: 'template/index.vue', // 模板的路径
        data: {
          name: name
        }
      }, {
        type: 'add', // 操作类型，这里是添加文件
        path: `src/views/${name}/index.js`, // 模板生成的路径
        templateFile: 'template/index.hbs', // 模板的路径
        data: {
          name: name
        }
      }, {
        type: 'add', // 操作类型，这里是添加文件
        path: `src/views/${name}/index.scss`, // 模板生成的路径
        templateFile: 'template/index.scss', // 模板的路径
        data: {
          name: name
        }
      }, {
        type: 'add', // 操作类型，这里是添加文件
        path: `src/views/${name}/routes.js`, // 模板生成的路径
        templateFile: 'template/view/routes.hbs', // 模板的路径
        data: {
          name: name
        }
      }];
      return actions;
    }
  });
  plop.setGenerator('component', { // 这里的 test 是一个自己设定的名字，在执行命令行的时候会用到
    description: 'generate a component', // 这里是对这个plop的功能描述
    prompts: [{
        type: 'input', // 问题的类型
        name: 'name', // 问题对应得到答案的变量名，可以在actions中使用该变量
        message: 'component name please', // 在命令行中的问题
        default: 'test' // 问题的默认答案
      },
      {
        type: 'input',
        name: 'path',
        message: 'Where you like to put this component?',
        default: 'components'
      },
      {
        type: 'confirm',
        name: 'useFolder',
        message: 'use component folder?',
        default: true
      }
    ],
    actions: data => {
      const {
        name,
        path,
        useFolder
      } = data;
      let actions;
      if (useFolder) {
        actions = [{
          type: 'add', // 操作类型，这里是添加文件
          path: `src/${path}/${name}/index.vue`, // 模板生成的路径
          templateFile: 'template/index.vue', // 模板的路径
          data: {
            name: name
          }
        }, {
          type: 'add', // 操作类型，这里是添加文件
          path: `src/${path}/${name}/index.js`, // 模板生成的路径
          templateFile: 'template/index.hbs', // 模板的路径
          data: {
            name: name
          }
        }, {
          type: 'add', // 操作类型，这里是添加文件
          path: `src/${path}/${name}/index.scss`, // 模板生成的路径
          templateFile: 'template/index.scss', // 模板的路径
          data: {
            name: name
          }
        }];
      } else {
        actions = [{
          type: 'add', // 操作类型，这里是添加文件
          path: `src/${path}/${name}.vue`, // 模板生成的路径
          templateFile: 'template/component.hbs', // 模板的路径
          data: {
            name: name
          }
        }]
      }
      return actions;
    }
  })
}