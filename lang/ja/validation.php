<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */

    'accepted' => ':attributeは承認が必要です。',
'accepted_if' => ':attributeは:otherが:valueのとき承認が必要です。',
'active_url' => ':attributeは有効なURLではありません。',
'after' => ':attributeは:dateより後の日付である必要があります。',
'after_or_equal' => ':attributeは:date以降の日付である必要があります。',
'alpha' => ':attributeは英字のみ使用できます。',
'alpha_dash' => ':attributeは英字・数字・ハイフン・アンダースコアのみ使用できます。',
'alpha_num' => ':attributeは英字と数字のみ使用できます。',
'any_of' => ':attributeは無効です。',
'array'=> ':attributeは配列である必要があります。',
'ascii' => ':attributeは半角英数字および記号のみ使用できます。',
'before' => ':attributeは:dateより前の日付である必要があります。',
'before_or_equal' => ':attributeは:date以前の日付である必要があります。',
'between' => [
    'array' => ':attributeは:min〜:max個である必要があります。',
    'file' => ':attributeは:min〜:maxKBである必要があります。',
    'numeric' => ':attributeは:min〜:maxの範囲である必要があります。',
    'string' => ':attributeは:min〜:max文字で入力してください。',
],



    'boolean' => ':attributeはtrueまたはfalseである必要があります。',
'can' => ':attributeに許可されていない値が含まれています。',
'confirmed' => ':attributeが一致しません。',
'contains' => ':attributeに必要な値が含まれていません。',
'current_password' => 'パスワードが正しくありません。',
'date' => ':attributeは有効な日付である必要があります。',
'date_equals' => ':attributeは:dateと同じ日付である必要があります。',
'date_format' => ':attributeは:format形式と一致する必要があります。',
'decimal' => ':attributeは:decimal桁の小数である必要があります。',
'declined' => ':attributeは拒否する必要があります。',
'declined_if' => ':attributeは:otherが:valueのとき拒否する必要があります。',
'different' => ':attributeと:otherは異なる必要があります。',
'digits' => ':attributeは:digits桁である必要があります。',
'digits_between' => ':attributeは:min〜:max桁である必要があります。',
'dimensions' => ':attributeの画像サイズが不正です。',
'distinct' => ':attributeに重複した値があります。',
'doesnt_contain' => ':attributeは:valuesを含んではいけません。',
'doesnt_end_with' => ':attributeは:valuesで終わってはいけません。',
'doesnt_start_with' => ':attributeは:valuesで始まってはいけません。',
'email' => ':attributeは有効なメールアドレスである必要があります。',
'encoding' => ':attributeは:encodingでエンコードされている必要があります。',
'ends_with' => ':attributeは次のいずれかで終わる必要があります: :values。',
'enum' => '選択された:attributeは無効です。',
'exists' => '選択された:attributeは無効です。',
'extensions' => ':attributeは次の拡張子のみ使用できます: :values。',
'file' => ':attributeはファイルである必要があります。',
'filled' => ':attributeは値が必要です。',
    'gt' => [
    'array' => ':attributeは:value個より多く必要です。',
    'file' => ':attributeは:valueKBより大きい必要があります。',
    'numeric' => ':attributeは:valueより大きい必要があります。',
    'string' => ':attributeは:value文字より多い必要があります。',
],
'gte' => [
    'array' => ':attributeは:value個以上必要です。',
    'file' => ':attributeは:valueKB以上必要です。',
    'numeric' => ':attributeは:value以上である必要があります。',
    'string' => ':attributeは:value文字以上である必要があります。',
],
'hex_color' => ':attributeは有効な16進カラーコードである必要があります。',
'image' => ':attributeは画像である必要があります。',
'in' => '選択された:attributeは無効です。',
'in_array' => ':attributeは:otherに存在する必要があります。',
'in_array_keys' => ':attributeは次のキーのいずれかを含む必要があります: :values。',
'integer' => ':attributeは整数である必要があります。',
'ip' => ':attributeは有効なIPアドレスである必要があります。',
'ipv4' => ':attributeは有効なIPv4アドレスである必要があります。',
'ipv6' => ':attributeは有効なIPv6アドレスである必要があります。',
'json' => ':attributeは有効なJSON形式である必要があります。',
'list' => ':attributeはリスト形式である必要があります。',
'lowercase' => ':attributeは小文字である必要があります。',
'lt' => [
    'array' => ':attributeは:value個未満である必要があります。',
    'file' => ':attributeは:valueKB未満である必要があります。',
    'numeric' => ':attributeは:value未満である必要があります。',
    'string' => ':attributeは:value文字未満である必要があります。',
],
'lte' => [
    'array' => ':attributeは:value個以下である必要があります。',
    'file' => ':attributeは:valueKB以下である必要があります。',
    'numeric' => ':attributeは:value以下である必要があります。',
    'string' => ':attributeは:value文字以下である必要があります。',
],
'mac_address' => ':attributeは有効なMACアドレスである必要があります。',
'max' => [
    'array' => ':attributeは:max個を超えてはいけません。',
    'file' => ':attributeは:maxKBを超えてはいけません。',
    'numeric' => ':attributeは:maxを超えてはいけません。',
    'string' => ':attributeは:max文字を超えてはいけません。',
],
'max_digits' => ':attributeは:max桁を超えてはいけません。',
'mimes' => ':attributeは:values形式のファイルである必要があります。',
'mimetypes' => ':attributeは:values形式のファイルである必要があります。',
'min' => [
    'array' => ':attributeは:min個以上必要です。',
    'file' => ':attributeは:minKB以上必要です。',
    'numeric' => ':attributeは:min以上である必要があります。',
    'string' => ':attributeは:min文字以上で入力してください。',
],
    'min_digits' => ':attributeは少なくとも:min桁である必要があります。',
'missing' => ':attributeは存在してはいけません。',
'missing_if' => ':otherが:valueのとき、:attributeは存在してはいけません。',
'missing_unless' => ':otherが:valueでない場合、:attributeは存在してはいけません。',
'missing_with' => ':valuesが存在する場合、:attributeは存在してはいけません。',
'missing_with_all' => ':valuesがすべて存在する場合、:attributeは存在してはいけません。',
'multiple_of' => ':attributeは:valueの倍数である必要があります。',
'not_in' => '選択された:attributeは無効です。',
'not_regex' => ':attributeの形式が正しくありません。',
'numeric' => ':attributeは数値である必要があります。',
'password' => [
    'letters' => ':attributeには少なくとも1文字のアルファベットが必要です。',
    'mixed' => ':attributeには大文字と小文字の両方が必要です。',
    'numbers' => ':attributeには少なくとも1つの数字が必要です。',
    'symbols' => ':attributeには少なくとも1つの記号が必要です。',
    'uncompromised' => ':attributeは漏洩した可能性があります。別のパスワードを設定してください。',
],



'present' => ':attributeは存在する必要があります。',
'present_if' => ':otherが:valueのとき、:attributeは存在する必要があります。',
'present_unless' => ':otherが:valueでない場合、:attributeは存在する必要があります。',
'present_with' => ':valuesが存在する場合、:attributeは存在する必要があります。',
'present_with_all' => ':valuesがすべて存在する場合、:attributeは存在する必要があります。',
'prohibited' => ':attributeは使用できません。',
'prohibited_if' => ':otherが:valueのとき、:attributeは使用できません。',
'prohibited_if_accepted' => ':otherが承認されている場合、:attributeは使用できません。',
'prohibited_if_declined' => ':otherが拒否されている場合、:attributeは使用できません。',
'prohibited_unless' => ':otherが:valuesに含まれていない場合、:attributeは使用できません。',
'prohibits' => ':attributeが存在する場合、:otherは入力できません。',
'regex' => ':attributeの形式が正しくありません。',
'required' => ':attributeは必須項目です。',
'required_array_keys' => ':attributeには次のキーが必要です: :values。',
'required_if' => ':otherが:valueのとき、:attributeは必須です。',
'required_if_accepted' => ':otherが承認されているとき、:attributeは必須です。',
'required_if_declined' => ':otherが拒否されているとき、:attributeは必須です。',
'required_unless' => ':otherが:valuesでない場合、:attributeは必須です。',
'required_with' => ':valuesが存在する場合、:attributeは必須です。',
'required_with_all' => ':valuesがすべて存在する場合、:attributeは必須です。',
'required_without' => ':valuesが存在しない場合、:attributeは必須です。',
'required_without_all' => ':valuesがすべて存在しない場合、:attributeは必須です。',
'same' => ':attributeは:otherと一致する必要があります。',
        'size' => [
    'array' => ':attributeは:size個である必要があります。',
    'file' => ':attributeは:sizeKBである必要があります。',
    'numeric' => ':attributeは:sizeである必要があります。',
    'string' => ':attributeは:size文字である必要があります。',
],





'starts_with' => ':attributeは次のいずれかで始まる必要があります: :values。',
'string' => ':attributeは文字列である必要があります。',
'timezone' => ':attributeは有効なタイムゾーンである必要があります。',
'unique' => ':attributeはすでに使用されています。',
'uploaded' => ':attributeのアップロードに失敗しました。',
'uppercase' => ':attributeは大文字である必要があります。',
'url' => ':attributeは有効なURLである必要があります。',
'ulid' => ':attributeは有効なULIDである必要があります。',
'uuid' => ':attributeは有効なUUIDである必要があります。',
    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'attribute-name' => [
            'rule-name' => 'custom-message',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap our attribute placeholder
    | with something more reader friendly such as "E-Mail Address" instead
    | of "email". This simply helps us make our message more expressive.
    |
    */

    'attributes' => [],

];
