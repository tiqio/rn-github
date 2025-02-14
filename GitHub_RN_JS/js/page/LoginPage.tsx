import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { ConfirmButton, Input, NavBar, Tips } from '../common/LoginComponent';
import LoginDao from "../expand/dao/LoginDao";
import NavigationUtil from "../navigator/NavigationUtil";

export default (props: any) => {
  const { navigation } = props;
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [helpUrl, setHelpUrl] = useState('');
  const onLogin = () => {
    if (userName === '' || password === '') {
      setMsg('用户名或密码不能为空');
      return;
    }
    setHelpUrl('');
    setMsg('');
    // userName: deplus
    // password: deplus
    LoginDao.getInstance()
      .login(userName, password)
      .then((res) => {
        console.log('success', res);
        NavigationUtil.resetToHomPage({ navigation });
      })
      .catch((e) => {
        const { code, data: { helpUrl = '' } = {}, msg } = e;
        setMsg(msg);
        setHelpUrl(helpUrl);
      });
  };
  return (
    <SafeAreaView style={styles.root}>
      <NavBar
        title="登录"
        rightTitle="注册"
        onRightClick={() => {
          NavigationUtil.goPage({ navigation }, 'RegistrationPage')}}
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
          secure={true}
          onChangeText={(text: string) => setPassword(text)}
        />
        <ConfirmButton title="登录" onClick={onLogin} />
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
  row: {
    flexDirection: 'row',
  },
  line: {
    height: 0.5,
    backgroundColor: '#D0D4D4',
  },
});
