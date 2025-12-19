import 'package:flutter/material.dart';

class PricingSection extends StatelessWidget {
  const PricingSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Choose Your Plan',
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
          const SizedBox(height: 24),
          _buildPricingCards(),
        ],
      ),
    );
  }

  Widget _buildPricingCards() {
    final plans = [
      {
        'name': 'Free',
        'price': '₹0',
        'period': '/month',
        'features': [
          '3 AI prompts/day',
          'View-only templates',
          'Community support',
          'Basic analytics',
        ],
        'color': const Color(0xFF6B7280),
        'popular': false,
      },
      {
        'name': 'Pro',
        'price': '₹999',
        'period': '/month',
        'features': [
          '50 AI prompts/day',
          '10 template downloads',
          '24h email support',
          'Blockchain protection',
          'Advanced analytics',
        ],
        'color': const Color(0xFF3B82F6),
        'popular': true,
      },
      {
        'name': 'Enterprise',
        'price': '₹2999',
        'period': '/month',
        'features': [
          'Unlimited prompts',
          'Unlimited downloads',
          '24/7 phone support',
          'Dark web monitoring',
          'Custom integrations',
          'Dedicated manager',
        ],
        'color': const Color(0xFF8B5CF6),
        'popular': false,
      },
    ];

    return Column(
      children: plans.map((plan) => _buildPricingCard(plan)).toList(),
    );
  }

  Widget _buildPricingCard(Map<String, dynamic> plan) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: const Color(0xFF1A1A2E),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: plan['popular'] ? plan['color'] : Colors.transparent,
          width: 2,
        ),
        boxShadow: plan['popular']
            ? [
                BoxShadow(
                  color: (plan['color'] as Color).withOpacity(0.3),
                  blurRadius: 20,
                  offset: const Offset(0, 10),
                ),
              ]
            : null,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (plan['popular'])
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
              decoration: BoxDecoration(
                color: plan['color'],
                borderRadius: BorderRadius.circular(20),
              ),
              child: const Text(
                'POPULAR',
                style: TextStyle(
                  fontSize: 10,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
            ),
          const SizedBox(height: 16),
          Text(
            plan['name'],
            style: const TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
          const SizedBox(height: 8),
          Row(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(
                plan['price'],
                style: TextStyle(
                  fontSize: 32,
                  fontWeight: FontWeight.bold,
                  color: plan['color'],
                ),
              ),
              Text(
                plan['period'],
                style: const TextStyle(
                  fontSize: 14,
                  color: Colors.white70,
                ),
              ),
            ],
          ),
          const SizedBox(height: 24),
          ...((plan['features'] as List<String>).map(
            (feature) => Padding(
              padding: const EdgeInsets.only(bottom: 12),
              child: Row(
                children: [
                  Icon(
                    Icons.check_circle,
                    color: plan['color'],
                    size: 20,
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Text(
                      feature,
                      style: const TextStyle(
                        fontSize: 14,
                        color: Colors.white70,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          )),
          const SizedBox(height: 24),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: () {},
              style: ElevatedButton.styleFrom(
                backgroundColor: plan['color'],
                padding: const EdgeInsets.symmetric(vertical: 16),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
              child: Text(
                plan['name'] == 'Free' ? 'Get Started' : 'Choose Plan',
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}