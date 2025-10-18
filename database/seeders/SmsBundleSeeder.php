<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\SmsBundle;

class SmsBundleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $bundles = [
            [
                'name' => 'Starter Pack',
                'sms_count' => 15,
                'price' => 1000,
                'currency' => 'UGX',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Basic Pack',
                'sms_count' => 33,
                'price' => 2000,
                'currency' => 'UGX',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Standard Pack',
                'sms_count' => 100,
                'price' => 5000,
                'currency' => 'UGX',
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Premium Pack',
                'sms_count' => 220,
                'price' => 10000,
                'currency' => 'UGX',
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'name' => 'Business Pack',
                'sms_count' => 500,
                'price' => 20000,
                'currency' => 'UGX',
                'is_active' => true,
                'sort_order' => 5,
            ],
            [
                'name' => 'Enterprise Pack',
                'sms_count' => 1300,
                'price' => 50000,
                'currency' => 'UGX',
                'is_active' => true,
                'sort_order' => 6,
            ],
        ];

        foreach ($bundles as $bundle) {
            SmsBundle::create($bundle);
        }
    }
}
