<?php

namespace Database\Seeders;

use App\Models\User;
use App\Traits\ImageUploadTrait;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    use ImageUploadTrait;
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user= User::create([
            'name' => "admin",
            'email' => "kenanmona90@gmail.com",
            'email_verified_at'=>now(),
            'password' => Hash::make("ZXCzxc!@#123"),
            "image"=>$this->renameFile(),
            'upload_successful'=>true,
            'disk'=>config('site.upload_disk')
        ]);
        $user->assignRole('admin','user');
    }
}
