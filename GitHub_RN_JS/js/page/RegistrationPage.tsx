import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import LoginDao from '../expand/dao/LoginDao';
import NavigationUtil from '../navigator/NavigationUtil';
import {ConfirmButton, Input, NavBar, Tips} from '../common/LoginComponent';

export default (props: any) => {
  const { navigation } = props;
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [imId, setImId] = useState('');
  const [orderId, setOrderId] = useState('');
  const [msg, setMsg] = useState('');
  const [helpUrl, setHelpUrl] = useState('');
  const onLogin = () => {
    setHelpUrl('');
    setMsg('');
    LoginDao.getInstance()
      .registration(userName, password, imId, orderId)
      .then((res) => {
        NavigationUtil.login({navigation});
      })
      .catch((e) => {
        const {code, data: {helpUrl = ''} = {}, msg} = e;
        setMsg(msg);
        setHelpUrl(helpUrl);
      });
  };
  return (
    <SafeAreaView style={styles.root}>
      <NavBar
        title="注册"
        rightTitle="登录"
        onRightClick={() => NavigationUtil.goPage({navigation}, 'LoginPage')}
      />
      <View style={styles.line} />
      <View style={styles.content}>
        <View style={styles.line} />
        <Input
          label="用户名"
          placeholder="请输入用户名"
          shortLine={true}
          onChangeText={(text: string) => setUserName(text)}
        />
        <Input
          label="密码"
          placeholder="请输入密码"
          shortLine={true}
          secure={true}
          onChangeText={(text: string) => setPassword(text)}
        />
        <Input
          label="慕课网ID"
          placeholder="请输入你的慕课网用户ID"
          shortLine={true}
          onChangeText={(text: string) => setImId(text)}
        />
        <Input
          label="课程订单号"
          placeholder="请输入课程订单号"
          onChangeText={(text: string) => setOrderId(text)}
        />
        <ConfirmButton title="注册" onClick={onLogin} />
        <Tips msg={msg} helpUrl={helpUrl} />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: 40,
  },
  content: {
    paddingTop: 20,
    backgroundColor: '#F1F5F6',
    flexGrow: 1,
  },

  line: {
    height: 0.5,
    backgroundColor: '#D0D4D4',
  },
});
