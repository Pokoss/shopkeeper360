<?php

namespace Database\Seeders;

use App\Models\PricingPlan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PricingPlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $plans = [
            [
                'name' => 'Basic',
                'slug' => 'basic',
                'price' => 38500,
                'currency' => 'UGX',
                'badge' => 'Retail Focused',
                'color' => 'bg-purple-100',
                'features' => [
                    'Retail functions only',
                    'Point of Sale',
                    'No Receipt Printing',
                    'Up to 3 Employees',
                    'Query 1 Month Range'
                ],
                'is_highlighted' => false,
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Standard',
                'slug' => 'standard',
                'price' => 54000,
                'currency' => 'UGX',
                'badge' => 'Most Popular',
                'color' => 'bg-orange-100',
                'features' => [
                    'Retail & Service Functions',
                    'Print Receipts & Reports',
                    'QR Product Display Page',
                    'Up to 10 Employees',
                    'Customer Bookings & Appointments'
                ],
                'is_highlighted' => true,
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Premium',
                'slug' => 'premium',
                'price' => 99000,
                'currency' => 'UGX',
                'badge' => 'Complete Access',
                'color' => 'bg-gray-100',
                'features' => [
                    'All Standard Features',
                    'Business Analytics Dashboard',
                    'Unlimited Queries',
                    'Unlimited Staff Accounts',
                    'Send SMS Campaigns'
                ],
                'is_highlighted' => false,
                'is_active' => true,
                'sort_order' => 3,
            ],
        ];

        foreach ($plans as $plan) {
            PricingPlan::create($plan);
        }
    }
}
