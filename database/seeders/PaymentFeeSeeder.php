<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PaymentFeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Check if fees already exist to avoid duplicates
        if (DB::table('payment_fees')->count() > 0) {
            $this->command->info('Payment fees already exist. Skipping seeding.');
            return;
        }

        $fees = [
            // Platform Fees (Your Revenue)
            [
                'fee_type' => 'platform',
                'name' => 'Platform Fee - Small (< 50,000 UGX)',
                'min_amount' => 0,
                'max_amount' => 49999.99,
                'calculation_type' => 'fixed',
                'fee_value' => 500,
                'is_active' => true,
                'priority' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'fee_type' => 'platform',
                'name' => 'Platform Fee - Medium (50,000 - 125,000 UGX)',
                'min_amount' => 50000,
                'max_amount' => 125000,
                'calculation_type' => 'fixed',
                'fee_value' => 1000,
                'is_active' => true,
                'priority' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'fee_type' => 'platform',
                'name' => 'Platform Fee - Large (> 125,000 UGX)',
                'min_amount' => 125000.01,
                'max_amount' => null,
                'calculation_type' => 'fixed',
                'fee_value' => 15000,
                'is_active' => true,
                'priority' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Gateway Fees (Flutterwave Charges)
            [
                'fee_type' => 'gateway',
                'name' => 'Flutterwave Fee - Standard (≤ 125,000 UGX)',
                'min_amount' => 0,
                'max_amount' => 125000,
                'calculation_type' => 'fixed',
                'fee_value' => 1000,
                'is_active' => true,
                'priority' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'fee_type' => 'gateway',
                'name' => 'Flutterwave Fee - Premium (> 125,000 UGX)',
                'min_amount' => 125000.01,
                'max_amount' => null,
                'calculation_type' => 'percentage',
                'fee_value' => 1.2,
                'is_active' => true,
                'priority' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('payment_fees')->insert($fees);

        $this->command->info('Payment fees seeded successfully!');
        $this->command->info('Seeded:');
        $this->command->info('- 3 Platform fee tiers');
        $this->command->info('- 2 Gateway fee tiers');
    }
}
