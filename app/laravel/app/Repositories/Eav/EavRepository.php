<?php

namespace App\Repositories\Eav;

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class EavRepository implements EavRepositoryInterface {
    public function createEntity($name): bool {
        if (!empty($name)) {
            $name = strtolower($name);

            $tableEntity = $name . 's';
            $tableEntityAttr = $name . '_attributes';
            $tableEntityValue = $name . '_values';

            if (!Schema::hasTable($tableEntity) && !Schema::hasTable($tableEntityAttr) && !Schema::hasTable($tableEntityValue)) {
                Schema::create($tableEntity, function (Blueprint $table) {
                    $table->id();
                    $table->string('name');
                    $table->timestamps();
                });

                Schema::create($tableEntityAttr, function (Blueprint $table) {
                    $table->id();
                    $table->string('name');
                    $table->string('type')->default('text');
                    $table->timestamps();
                });

                Schema::create($tableEntityValue, function (Blueprint $table) use ($name, $tableEntityAttr, $tableEntity) {
                    $table->unsignedBigInteger($name . '_id');
                    $table->foreign($name . '_id')->references('id')->on($tableEntity)->onDelete('cascade');
                    $table->unsignedBigInteger($name . '_attribute_id');
                    $table->foreign($name . '_attribute_id')->references('id')->on($tableEntityAttr)->onDelete('cascade');
                    $table->longText('value');
                });

                return true;
            }
        }

        return false;
    }
}
