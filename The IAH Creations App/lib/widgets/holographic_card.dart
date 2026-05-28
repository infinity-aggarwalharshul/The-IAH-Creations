import 'package:flutter/material.dart';
import 'package:glassmorphism_ui/glassmorphism_ui.dart';

class HolographicCard extends StatelessWidget {
  final Widget child;
  final double? width;
  final double? height;
  final VoidCallback? onTap;

  const HolographicCard({
    Key? key, 
    required this.child, 
    this.width, 
    this.height,
    this.onTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: GlassContainer(
        height: height,
        width: width,
        blur: 10,
        color: Colors.white.withOpacity(0.05),
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            Colors.white.withOpacity(0.1),
            Colors.white.withOpacity(0.05),
          ],
        ),
        border: Border.fromBorderSide(BorderSide.none),
        shadowStrength: 4,
        borderRadius: BorderRadius.circular(16),
        shadowColor: Colors.blue.withOpacity(0.2),
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: child,
        ),
      ),
    );
  }
}
