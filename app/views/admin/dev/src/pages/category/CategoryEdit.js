import React from 'react'
import {Breadcrumb, Icon, Form, Input, Button} from 'antd'
import {Link} from 'react-router-dom'
import MainContent from '@pages/wiget/MainContent'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: {span: 2},
  wrapperCol: {span: 8},
};
const formTailLayout = {
  labelCol: {span: 2},
  wrapperCol: {span: 8, offset: 2},
};

class CategoryEdit extends React.Component {

  handleSubmit() {
    const {history} = this.props
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios.post('/admin/category', {...values})
          .then(res => {
            if (res.ok) {
              history.goBack()
            }
          })
      }
    })
  }

  handleEdit() {
    const {history} = this.props
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios.post('/admin/category/edit', {...this.category, ...values})
          .then(res => {
            if (res.ok) {
              history.goBack()
            }
          })
      }
    })
  }

  componentDidMount() {
    const {state} = this.props.location
    if (state && state.action === 'edit') {
      this.category = state.data
      this.props.form.setFieldsValue({name: state.data.name})
      this.props.form.setFieldsValue({desc: state.data.desc})
    }
  }

  get optBtn() {
    const {state} = this.props.location;
    return state && state.action === 'edit' ?
      <Button type="primary" onClick={this.handleEdit.bind(this)}>编辑</Button> :
      <Button type="primary" onClick={this.handleSubmit.bind(this)}>添加</Button>;
  }

  render() {
    const {getFieldDecorator} = this.props.form
    return (
      <div>
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <Icon type="book"/>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/category">列表</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>添加分类</Breadcrumb.Item>
        </Breadcrumb>
        <MainContent>
          <Form>
            <FormItem {...formItemLayout} label="名称">
              {
                getFieldDecorator('name', {
                  rules: [{
                    required: true,
                    message: '请输入正确的分类名称'
                  }]
                })(
                  <Input placeholder="名称"/>
                )
              }
            </FormItem>
            <FormItem {...formItemLayout} label="简介">
              {
                getFieldDecorator('desc', {
                  rules: [{
                    required: true,
                    message: '随便输入点啥'
                  }]
                })(
                  <Input placeholder="名称" type="textarea" rows={2}/>
                )
              }
            </FormItem>
            <FormItem {...formTailLayout}>
              {this.optBtn}
            </FormItem>
          </Form>
        </MainContent>
      </div>
    )
  }
}

export default Form.create({})(CategoryEdit)