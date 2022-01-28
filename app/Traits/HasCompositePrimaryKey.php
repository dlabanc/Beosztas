<?php

namespace App\Traits;
use Illuminate\Database\Eloquent\Builder;

trait HasCompositePrimaryKey{
    protected function setKeysForSaveQuery($query)
    {
        $keys = $this->getKeyName();
        foreach($keys as $keyName){
            $query->where($keyName, '=', $this->getKeyForSaveQuery($keyName));
        }
            
        return $query;
    }

    protected function getKeyForSaveQuery($keyName = null)
    {
        if(is_null($keyName)){
            $keyName = $this->getKeyName();
        }

        if (isset($this->original[$keyName])) {
            return $this->original[$keyName];
        }
            
        return $this->getAttribute($keyName);
    }
}