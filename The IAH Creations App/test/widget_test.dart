import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import '../main.dart';

void main() {
  testWidgets('App smoke test', (WidgetTester tester) async {
    await tester.pumpWidget(const IAHCreationsApp());
    expect(find.text('The IAH Creations'), findsOneWidget);
  });
}