import 'package:flutter/material.dart';
import 'package:trach/pages/chatroom.dart';
import 'package:trach/pages/createservice.dart';
import 'package:trach/pages/profile.dart';
import 'package:trach/pages/search.dart';
import 'package:trach/pages/services.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class Home extends StatefulWidget {
  Home({Key? key}) : super(key: key);

  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  bool isAuth = true;
  late PageController pageController;
  int pageIndex = 0;

  @override
  void initState() {
    super.initState();
    pageController = PageController(
      initialPage: 0,
    );
  }

  @override
  void dispose() {
    pageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return isAuth ? buildAuthScreen() : buildunAuthScreen();
  }

  Scaffold buildAuthScreen() {
    return Scaffold(
      body: PageView(
        children: <Widget>[
          Services(),
          Search(),
          CreateService(),
          Chatroom(),
          Profile()
        ],
        controller: pageController,
        onPageChanged: onPageChanged,
        physics:const NeverScrollableScrollPhysics(),
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: pageIndex,
        onTap: onTap,
        selectedItemColor: Theme.of(context).primaryColor,
        type: BottomNavigationBarType.fixed,
        showSelectedLabels: false,
        showUnselectedLabels: false,
        items: [
          BottomNavigationBarItem(icon: FaIcon(FontAwesomeIcons.home), label: ""),
          BottomNavigationBarItem(icon: FaIcon(FontAwesomeIcons.search), label: ""),
          BottomNavigationBarItem(icon: FaIcon(FontAwesomeIcons.plusCircle), label: ""),
          BottomNavigationBarItem(icon: FaIcon(FontAwesomeIcons.commentDots), label: ""),
          BottomNavigationBarItem(icon: FaIcon(FontAwesomeIcons.userCircle), label: "")
        ],
      ),
    );
  }

  buildunAuthScreen() {}

  void onPageChanged(int pageIndex) {
    setState(() {
      this.pageIndex = pageIndex;
    });
  }

  void onTap(int pageIndex) {
    pageController.jumpToPage(pageIndex);
  }
}
