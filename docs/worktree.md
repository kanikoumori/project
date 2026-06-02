#用途
・現在のフォルダ構成と、どこを誰が触るかを書くファイル
以下記入例

## 主に編集する場所

### バックエンド担当
- app/Http/Controllers/
- app/Models/
- database/migrations/
- routes/web.php
- routes/api.php

### フロントエンド担当
- resources/views/
- resources/css/
- resources/js/

### テスト・資料担当
- tests/
- docs/
- README.md

## 触らない場所

- vendor/
- node_modules/
- public/build/
- storage/logs/

# Worktree

## 基本構成

project/
├ app/
|　├ Http
|　├ Models
|　├
├ database/
├ public/
├ resources/
│  ├ css/
│  ├ js/
│  └ views/
├ routes/
├ tests/
└ docs/
## 詳細構成

ツリー
C:.
├─app
│  ├─Http
│  │  └─Controllers
│  ├─Models
│  └─Providers
├─bootstrap
│  └─cache
├─config
├─database
│  ├─factories
│  ├─migrations
│  └─seeders
├─docs
├─node_modules
│  ├─.bin
│  ├─@esbuild
│  │  └─win32-x64
│  ├─@jridgewell
│  │  ├─gen-mapping
│  │  │  ├─dist
│  │  │  │  └─types
│  │  │  ├─src
│  │  │  └─types
│  │  ├─remapping
│  │  │  ├─dist
│  │  │  ├─src
│  │  │  └─types
│  │  ├─resolve-uri
│  │  │  └─dist
│  │  │      └─types
│  │  ├─sourcemap-codec
│  │  │  ├─dist
│  │  │  ├─src
│  │  │  └─types
│  │  └─trace-mapping
│  │      ├─dist
│  │      ├─src
│  │      └─types
│  ├─@rollup
│  │  ├─rollup-win32-x64-gnu
│  │  └─rollup-win32-x64-msvc
│  ├─@tailwindcss
│  │  ├─node
│  │  │  └─dist
│  │  ├─oxide
│  │  ├─oxide-win32-x64-msvc
│  │  └─vite
│  │      └─dist
│  ├─@types
│  │  └─estree
│  ├─agent-base
│  │  ├─dist
│  │  │  └─src
│  │  └─src
│  ├─ansi-regex
│  ├─ansi-styles
│  ├─asynckit
│  │  └─lib
│  ├─axios
│  │  ├─dist
│  │  │  ├─browser
│  │  │  ├─esm
│  │  │  └─node
│  │  └─lib
│  │      ├─adapters
│  │      ├─cancel
│  │      ├─core
│  │      ├─defaults
│  │      ├─env
│  │      │  └─classes
│  │      ├─helpers
│  │      └─platform
│  │          ├─browser
│  │          │  └─classes
│  │          ├─common
│  │          └─node
│  │              └─classes
│  ├─call-bind-apply-helpers
│  │  ├─.github
│  │  └─test
│  ├─chalk
│  │  ├─node_modules
│  │  │  └─supports-color
│  │  └─source
│  ├─cliui
│  │  └─build
│  │      └─lib
│  ├─color-convert
│  ├─color-name
│  ├─combined-stream
│  │  └─lib
│  ├─concurrently
│  │  ├─dist
│  │  │  ├─bin
│  │  │  └─src
│  │  │      ├─command-parser
│  │  │      └─flow-control
│  │  └─docs
│  │      └─cli
│  ├─debug
│  │  └─src
│  ├─delayed-stream
│  │  └─lib
│  ├─detect-libc
│  │  └─lib
│  ├─dunder-proto
│  │  ├─.github
│  │  └─test
│  ├─emoji-regex
│  │  └─es2015
│  ├─enhanced-resolve
│  │  └─lib
│  │      └─util
│  ├─es-define-property
│  │  ├─.github
│  │  └─test
│  ├─es-errors
│  │  ├─.github
│  │  └─test
│  ├─es-object-atoms
│  │  ├─.github
│  │  └─test
│  ├─es-set-tostringtag
│  │  └─test
│  ├─esbuild
│  │  ├─bin
│  │  └─lib
│  ├─escalade
│  │  ├─dist
│  │  └─sync
│  ├─fdir
│  │  └─dist
│  ├─follow-redirects
│  ├─form-data
│  │  └─lib
│  ├─function-bind
│  │  ├─.github
│  │  └─test
│  ├─get-caller-file
│  ├─get-intrinsic
│  │  ├─.github
│  │  └─test
│  ├─get-proto
│  │  ├─.github
│  │  └─test
│  ├─gopd
│  │  ├─.github
│  │  └─test
│  ├─graceful-fs
│  ├─has-flag
│  ├─has-symbols
│  │  ├─.github
│  │  └─test
│  │      └─shams
│  ├─has-tostringtag
│  │  ├─.github
│  │  └─test
│  │      └─shams
│  ├─hasown
│  │  └─.github
│  ├─https-proxy-agent
│  │  └─dist
│  ├─is-fullwidth-code-point
│  ├─jiti
│  │  ├─dist
│  │  └─lib
│  ├─laravel-vite-plugin
│  │  ├─bin
│  │  ├─dist
│  │  └─inertia-helpers
│  ├─lightningcss
│  │  └─node
│  ├─lightningcss-win32-x64-msvc
│  ├─magic-string
│  │  └─dist
│  ├─math-intrinsics
│  │  ├─.github
│  │  ├─constants
│  │  └─test
│  ├─mime-db
│  ├─mime-types
│  ├─ms
│  ├─nanoid
│  │  ├─.claude
│  │  ├─async
│  │  ├─bin
│  │  ├─non-secure
│  │  └─url-alphabet
│  ├─picocolors
│  ├─picomatch
│  │  └─lib
│  ├─postcss
│  │  └─lib
│  ├─proxy-from-env
│  ├─require-directory
│  ├─rollup
│  │  └─dist
│  │      ├─bin
│  │      ├─es
│  │      │  └─shared
│  │      └─shared
│  ├─rxjs
│  │  ├─ajax
│  │  ├─dist
│  │  │  ├─bundles
│  │  │  ├─cjs
│  │  │  │  ├─ajax
│  │  │  │  ├─fetch
│  │  │  │  ├─internal
│  │  │  │  │  ├─ajax
│  │  │  │  │  ├─observable
│  │  │  │  │  │  └─dom
│  │  │  │  │  ├─operators
│  │  │  │  │  ├─scheduled
│  │  │  │  │  ├─scheduler
│  │  │  │  │  ├─symbol
│  │  │  │  │  ├─testing
│  │  │  │  │  └─util
│  │  │  │  ├─operators
│  │  │  │  ├─testing
│  │  │  │  └─webSocket
│  │  │  ├─esm
│  │  │  │  ├─ajax
│  │  │  │  ├─fetch
│  │  │  │  ├─internal
│  │  │  │  │  ├─ajax
│  │  │  │  │  ├─observable
│  │  │  │  │  │  └─dom
│  │  │  │  │  ├─operators
│  │  │  │  │  ├─scheduled
│  │  │  │  │  ├─scheduler
│  │  │  │  │  ├─symbol
│  │  │  │  │  ├─testing
│  │  │  │  │  └─util
│  │  │  │  ├─operators
│  │  │  │  ├─testing
│  │  │  │  └─webSocket
│  │  │  ├─esm5
│  │  │  │  ├─ajax
│  │  │  │  ├─fetch
│  │  │  │  ├─internal
│  │  │  │  │  ├─ajax
│  │  │  │  │  ├─observable
│  │  │  │  │  │  └─dom
│  │  │  │  │  ├─operators
│  │  │  │  │  ├─scheduled
│  │  │  │  │  ├─scheduler
│  │  │  │  │  ├─symbol
│  │  │  │  │  ├─testing
│  │  │  │  │  └─util
│  │  │  │  ├─operators
│  │  │  │  ├─testing
│  │  │  │  └─webSocket
│  │  │  └─types
│  │  │      ├─ajax
│  │  │      ├─fetch
│  │  │      ├─internal
│  │  │      │  ├─ajax
│  │  │      │  ├─observable
│  │  │      │  │  └─dom
│  │  │      │  ├─operators
│  │  │      │  ├─scheduled
│  │  │      │  ├─scheduler
│  │  │      │  ├─symbol
│  │  │      │  ├─testing
│  │  │      │  └─util
│  │  │      ├─operators
│  │  │      ├─testing
│  │  │      └─webSocket
│  │  ├─fetch
│  │  ├─operators
│  │  ├─src
│  │  │  ├─ajax
│  │  │  ├─fetch
│  │  │  ├─internal
│  │  │  │  ├─ajax
│  │  │  │  ├─observable
│  │  │  │  │  └─dom
│  │  │  │  ├─operators
│  │  │  │  ├─scheduled
│  │  │  │  ├─scheduler
│  │  │  │  ├─symbol
│  │  │  │  ├─testing
│  │  │  │  └─util
│  │  │  ├─operators
│  │  │  ├─testing
│  │  │  └─webSocket
│  │  ├─testing
│  │  └─webSocket
│  ├─shell-quote
│  │  ├─.github
│  │  └─test
│  ├─source-map-js
│  │  └─lib
│  ├─string-width
│  ├─strip-ansi
│  ├─supports-color
│  ├─tailwindcss
│  │  └─dist
│  ├─tapable
│  │  └─lib
│  ├─tinyglobby
│  │  └─dist
│  ├─tree-kill
│  ├─tslib
│  │  └─modules
│  ├─vite
│  │  ├─bin
│  │  ├─dist
│  │  │  ├─client
│  │  │  └─node
│  │  │      └─chunks
│  │  ├─misc
│  │  └─types
│  │      └─internal
│  ├─vite-plugin-full-reload
│  │  ├─dist
│  │  └─node_modules
│  │      └─picomatch
│  │          └─lib
│  ├─wrap-ansi
│  ├─y18n
│  │  └─build
│  │      └─lib
│  │          └─platform-shims
│  ├─yargs
│  │  ├─build
│  │  │  └─lib
│  │  │      ├─typings
│  │  │      └─utils
│  │  ├─helpers
│  │  ├─lib
│  │  │  └─platform-shims
│  │  └─locales
│  └─yargs-parser
│      └─build
│          └─lib
├─public
├─resources
│  ├─css
│  │  ├─components
│  │  ├─dashboard
│  │  ├─editor
│  │  └─theme
│  ├─js
│  │  ├─analytics
│  │  ├─autosave
│  │  ├─editor
│  │  ├─preview
│  │  └─theme
│  └─views
│      ├─auth
│      ├─dashboard
│      ├─editor
│      ├─preview
│      ├─publish
│      └─templates
├─routes
├─storage
│  ├─app
│  │  ├─private
│  │  └─public
│  ├─framework
│  │  ├─cache
│  │  │  └─data
│  │  ├─sessions
│  │  ├─testing
│  │  └─views
│  └─logs
├─tests
│  ├─Feature
│  └─Unit
└─vendor
    ├─bin
    ├─brick
    │  └─math
    │      ├─.github
    │      │  └─workflows
    │      ├─src
    │      │  ├─Exception
    │      │  └─Internal
    │      │      └─Calculator
    │      ├─tests
    │      └─tools
    │          └─ecs
    ├─carbonphp
    │  └─carbon-doctrine-types
    │      ├─.github
    │      │  └─workflows
    │      ├─src
    │      │  └─Carbon
    │      │      └─Doctrine
    │      └─tests
    │          └─Doctrine
    ├─composer
    ├─dflydev
    │  └─dot-access-data
    │      ├─.github
    │      │  └─workflows
    │      ├─src
    │      │  └─Exception
    │      └─tests
    ├─doctrine
    │  ├─inflector
    │  │  ├─.github
    │  │  │  └─workflows
    │  │  ├─docs
    │  │  │  └─en
    │  │  ├─src
    │  │  │  └─Rules
    │  │  │      ├─English
    │  │  │      ├─Esperanto
    │  │  │      ├─French
    │  │  │      ├─Italian
    │  │  │      ├─NorwegianBokmal
    │  │  │      ├─Portuguese
    │  │  │      ├─Spanish
    │  │  │      └─Turkish
    │  │  └─tests
    │  │      └─Rules
    │  │          ├─English
    │  │          ├─Esperanto
    │  │          ├─French
    │  │          ├─Italian
    │  │          ├─NorwegianBokmal
    │  │          ├─Portuguese
    │  │          ├─Spanish
    │  │          └─Turkish
    │  └─lexer
    │      ├─.github
    │      │  └─workflows
    │      ├─docs
    │      │  └─en
    │      ├─src
    │      └─tests
    ├─dragonmantank
    │  └─cron-expression
    │      ├─.github
    │      │  └─workflows
    │      ├─src
    │      │  └─Cron
    │      └─tests
    │          └─Cron
    ├─egulias
    │  └─email-validator
    │      ├─.github
    │      │  └─workflows
    │      ├─documentation
    │      ├─src
    │      │  ├─Parser
    │      │  │  └─CommentStrategy
    │      │  ├─Result
    │      │  │  └─Reason
    │      │  ├─Validation
    │      │  │  ├─Exception
    │      │  │  └─Extra
    │      │  └─Warning
    │      └─tests
    │          └─EmailValidator
    │              ├─Dummy
    │              ├─Reason
    │              ├─Result
    │              └─Validation
    │                  └─Extra
    ├─fakerphp
    │  └─faker
    │      ├─.github
    │      │  ├─ISSUE_TEMPLATE
    │      │  └─workflows
    │      ├─src
    │      │  └─Faker
    │      │      ├─Calculator
    │      │      ├─Container
    │      │      ├─Core
    │      │      ├─Extension
    │      │      ├─Guesser
    │      │      ├─ORM
    │      │      │  ├─CakePHP
    │      │      │  ├─Doctrine
    │      │      │  ├─Mandango
    │      │      │  ├─Propel
    │      │      │  ├─Propel2
    │      │      │  └─Spot
    │      │      └─Provider
    │      │          ├─ar_EG
    │      │          ├─ar_JO
    │      │          ├─ar_SA
    │      │          ├─at_AT
    │      │          ├─bg_BG
    │      │          ├─bn_BD
    │      │          ├─cs_CZ
    │      │          ├─da_DK
    │      │          ├─de_AT
    │      │          ├─de_CH
    │      │          ├─de_DE
    │      │          ├─el_CY
    │      │          ├─el_GR
    │      │          ├─en_AU
    │      │          ├─en_CA
    │      │          ├─en_GB
    │      │          ├─en_HK
    │      │          ├─en_IN
    │      │          ├─en_NG
    │      │          ├─en_NZ
    │      │          ├─en_PH
    │      │          ├─en_SG
    │      │          ├─en_UG
    │      │          ├─en_US
    │      │          ├─en_ZA
    │      │          ├─es_AR
    │      │          ├─es_ES
    │      │          ├─es_PE
    │      │          ├─es_VE
    │      │          ├─et_EE
    │      │          ├─fa_IR
    │      │          ├─fi_FI
    │      │          ├─fr_BE
    │      │          ├─fr_CA
    │      │          ├─fr_CH
    │      │          ├─fr_FR
    │      │          ├─he_IL
    │      │          ├─hr_HR
    │      │          ├─hu_HU
    │      │          ├─hy_AM
    │      │          ├─id_ID
    │      │          ├─is_IS
    │      │          ├─it_CH
    │      │          ├─it_IT
    │      │          ├─ja_JP
    │      │          ├─ka_GE
    │      │          ├─kk_KZ
    │      │          ├─ko_KR
    │      │          ├─lt_LT
    │      │          ├─lv_LV
    │      │          ├─me_ME
    │      │          ├─mn_MN
    │      │          ├─ms_MY
    │      │          ├─nb_NO
    │      │          ├─ne_NP
    │      │          ├─nl_BE
    │      │          ├─nl_NL
    │      │          ├─pl_PL
    │      │          ├─pt_BR
    │      │          ├─pt_PT
    │      │          ├─ro_MD
    │      │          ├─ro_RO
    │      │          ├─ru_RU
    │      │          ├─sk_SK
    │      │          ├─sl_SI
    │      │          ├─sr_Cyrl_RS
    │      │          ├─sr_Latn_RS
    │      │          ├─sr_RS
    │      │          ├─sv_SE
    │      │          ├─th_TH
    │      │          ├─tr_TR
    │      │          ├─uk_UA
    │      │          ├─vi_VN
    │      │          ├─zh_CN
    │      │          └─zh_TW
    │      ├─test
    │      │  ├─Faker
    │      │  │  ├─Calculator
    │      │  │  ├─Core
    │      │  │  ├─Extension
    │      │  │  ├─ORM
    │      │  │  │  └─Doctrine
    │      │  │  └─Provider
    │      │  │      ├─ar_EG
    │      │  │      ├─ar_JO
    │      │  │      ├─ar_SA
    │      │  │      ├─bg_BG
    │      │  │      ├─bn_BD
    │      │  │      ├─cs_CZ
    │      │  │      ├─da_DK
    │      │  │      ├─de_AT
    │      │  │      ├─de_CH
    │      │  │      ├─de_DE
    │      │  │      ├─el_GR
    │      │  │      ├─en_AU
    │      │  │      ├─en_CA
    │      │  │      ├─en_GB
    │      │  │      ├─en_IN
    │      │  │      ├─en_NG
    │      │  │      ├─en_NZ
    │      │  │      ├─en_PH
    │      │  │      ├─en_SG
    │      │  │      ├─en_UG
    │      │  │      ├─en_US
    │      │  │      ├─en_ZA
    │      │  │      ├─es_ES
    │      │  │      ├─es_PE
    │      │  │      ├─es_VE
    │      │  │      ├─fa_IR
    │      │  │      ├─fi_FI
    │      │  │      ├─fr_BE
    │      │  │      ├─fr_CH
    │      │  │      ├─fr_FR
    │      │  │      ├─hu_HU
    │      │  │      ├─id_ID
    │      │  │      ├─it_CH
    │      │  │      ├─it_IT
    │      │  │      ├─ja_JP
    │      │  │      ├─ka_GE
    │      │  │      ├─kk_KZ
    │      │  │      ├─ko_KR
    │      │  │      ├─lt_LT
    │      │  │      ├─lv_LV
    │      │  │      ├─mn_MN
    │      │  │      ├─ms_MY
    │      │  │      ├─nb_NO
    │      │  │      ├─ne_NP
    │      │  │      ├─nl_BE
    │      │  │      ├─nl_NL
    │      │  │      ├─pl_PL
    │      │  │      ├─pt_BR
    │      │  │      ├─pt_PT
    │      │  │      ├─ro_RO
    │      │  │      ├─ru_RU
    │      │  │      ├─sv_SE
    │      │  │      ├─tr_TR
    │      │  │      ├─uk_UA
    │      │  │      └─zh_TW
    │      │  └─Fixture
    │      │      ├─Container
    │      │      ├─Enum
    │      │      └─Provider
    │      └─vendor-bin
    │          ├─php-cs-fixer
    │          ├─phpstan
    │          ├─psalm
    │          └─rector
    ├─filp
    │  └─whoops
    │      ├─.github
    │      │  └─workflows
    │      ├─docs
    │      ├─examples
    │      ├─src
    │      │  └─Whoops
    │      │      ├─Exception
    │      │      ├─Handler
    │      │      ├─Inspector
    │      │      ├─Resources
    │      │      │  ├─css
    │      │      │  ├─js
    │      │      │  └─views
    │      │      └─Util
    │      └─tests
    │          ├─fixtures
    │          └─Whoops
    │              ├─Exception
    │              ├─Handler
    │              └─Util
    ├─fruitcake
    │  └─php-cors
    │      ├─.github
    │      │  └─workflows
    │      ├─src
    │      │  └─Exceptions
    │      └─tests
    ├─graham-campbell
    │  └─result-type
    │      ├─.github
    │      │  └─workflows
    │      ├─src
    │      └─tests
    ├─guzzlehttp
    │  ├─guzzle
    │  │  ├─.github
    │  │  │  ├─ISSUE_TEMPLATE
    │  │  │  └─workflows
    │  │  ├─docs
    │  │  │  └─_static
    │  │  ├─src
    │  │  │  ├─Cookie
    │  │  │  ├─Exception
    │  │  │  └─Handler
    │  │  ├─tests
    │  │  │  ├─Cookie
    │  │  │  ├─Exception
    │  │  │  └─Handler
    │  │  │      └─Network
    │  │  └─vendor-bin
    │  │      ├─composer-normalize
    │  │      ├─php-cs-fixer
    │  │      └─phpstan
    │  ├─promises
    │  │  ├─.github
    │  │  │  └─workflows
    │  │  ├─src
    │  │  ├─tests
    │  │  └─vendor-bin
    │  │      ├─composer-normalize
    │  │      ├─php-cs-fixer
    │  │      └─phpstan
    │  ├─psr7
    │  │  ├─.github
    │  │  │  └─workflows
    │  │  ├─hack
    │  │  ├─src
    │  │  │  └─Exception
    │  │  ├─tests
    │  │  │  └─Integration
    │  │  └─vendor-bin
    │  │      ├─composer-normalize
    │  │      ├─php-cs-fixer
    │  │      └─phpstan
    │  └─uri-template
    │      ├─.github
    │      │  └─workflows
    │      ├─src
    │      ├─tests
    │      └─vendor-bin
    │          ├─composer-normalize
    │          ├─php-cs-fixer
    │          └─phpstan
    ├─hamcrest
    │  └─hamcrest-php
    │      ├─.github
    │      │  └─workflows
    │      ├─generator
    │      │  └─parts
    │      ├─hamcrest
    │      │  └─Hamcrest
    │      │      ├─Arrays
    │      │      ├─Collection
    │      │      ├─Core
    │      │      ├─Internal
    │      │      ├─Number
    │      │      ├─Text
    │      │      ├─Type
    │      │      └─Xml
    │      └─tests
    │          └─Hamcrest
    │              ├─Array
    │              ├─Collection
    │              ├─Core
    │              ├─Number
    │              ├─Text
    │              ├─Type
    │              └─Xml
    ├─laravel
    │  ├─framework
    │  │  ├─.github
    │  │  │  ├─ISSUE_TEMPLATE
    │  │  │  └─workflows
    │  │  ├─bin
    │  │  ├─config
    │  │  ├─config-stubs
    │  │  ├─src
    │  │  │  └─Illuminate
    │  │  │      ├─Auth
    │  │  │      │  ├─.github
    │  │  │      │  │  └─workflows
    │  │  │      │  ├─Access
    │  │  │      │  │  └─Events
    │  │  │      │  ├─Console
    │  │  │      │  │  └─stubs
    │  │  │      │  │      └─make
    │  │  │      │  │          └─views
    │  │  │      │  │              └─layouts
    │  │  │      │  ├─Events
    │  │  │      │  ├─Listeners
    │  │  │      │  ├─Middleware
    │  │  │      │  ├─Notifications
    │  │  │      │  └─Passwords
    │  │  │      ├─Broadcasting
    │  │  │      │  ├─.github
    │  │  │      │  │  └─workflows
    │  │  │      │  └─Broadcasters
    │  │  │      ├─Bus
    │  │  │      │  ├─.github
    │  │  │      │  │  └─workflows
    │  │  │      │  └─Events
    │  │  │      ├─Cache
    │  │  │      │  ├─.github
    │  │  │      │  │  └─workflows
    │  │  │      │  ├─Console
    │  │  │      │  │  └─stubs
    │  │  │      │  ├─Events
    │  │  │      │  ├─Limiters
    │  │  │      │  └─RateLimiting
    │  │  │      ├─Collections
    │  │  │      │  ├─.github
    │  │  │      │  │  └─workflows
    │  │  │      │  └─Traits
    │  │  │      ├─Concurrency
    │  │  │      │  └─Console
    │  │  │      ├─Conditionable
    │  │  │      │  ├─.github
    │  │  │      │  │  └─workflows
    │  │  │      │  └─Traits
    │  │  │      ├─Config
    │  │  │      │  └─.github
    │  │  │      │      └─workflows
    │  │  │      ├─Console
    │  │  │      │  ├─.github
    │  │  │      │  │  └─workflows
    │  │  │      │  ├─Concerns
    │  │  │      │  ├─Contracts
    │  │  │      │  ├─Events
    │  │  │      │  ├─resources
    │  │  │      │  │  └─views
    │  │  │      │  │      └─components
    │  │  │      │  ├─Scheduling
    │  │  │      │  └─View
    │  │  │      │      └─Components
    │  │  │      │          └─Mutators
    │  │  │      ├─Container
    │  │  │      │  ├─.github
    │  │  │      │  │  └─workflows
    │  │  │      │  └─Attributes
    │  │  │      ├─Contracts
    │  │  │      │  ├─.github
    │  │  │      │  │  └─workflows
    │  │  │      │  ├─Auth
    │  │  │      │  │  ├─Access
    │  │  │      │  │  └─Middleware
    │  │  │      │  ├─Broadcasting
    │  │  │      │  ├─Bus
    │  │  │      │  ├─Cache
    │  │  │      │  ├─Concurrency
    │  │  │      │  ├─Config
    │  │  │      │  ├─Console
    │  │  │      │  ├─Container
    │  │  │      │  ├─Cookie
    │  │  │      │  ├─Database
    │  │  │      │  │  ├─Eloquent
    │  │  │      │  │  ├─Events
    │  │  │      │  │  └─Query
    │  │  │      │  ├─Debug
    │  │  │      │  ├─Encryption
    │  │  │      │  ├─Events
    │  │  │      │  ├─Filesystem
    │  │  │      │  ├─Foundation
    │  │  │      │  ├─Hashing
    │  │  │      │  ├─Http
    │  │  │      │  ├─JsonSchema
    │  │  │      │  ├─Log
    │  │  │      │  ├─Mail
    │  │  │      │  ├─Notifications
    │  │  │      │  ├─Pagination
    │  │  │      │  ├─Pipeline
    │  │  │      │  ├─Process
    │  │  │      │  ├─Queue
    │  │  │      │  ├─Redis
    │  │  │      │  ├─Routing
    │  │  │      │  ├─Session
    │  │  │      │  │  └─Middleware
    │  │  │      │  ├─Support
    │  │  │      │  ├─Translation
    │  │  │      │  ├─Validation
    │  │  │      │  └─View
    │  │  │      ├─Cookie
    │  │  │      │  ├─.github
    │  │  │      │  │  └─workflows
    │  │  │      │  └─Middleware
    │  │  │      ├─Database
    │  │  │      │  ├─.github
    │  │  │      │  │  └─workflows
    │  │  │      │  ├─Capsule
    │  │  │      │  ├─Concerns
    │  │  │      │  ├─Connectors
    │  │  │      │  ├─Console
    │  │  │      │  │  ├─Factories
    │  │  │      │  │  │  └─stubs
    │  │  │      │  │  ├─Migrations
    │  │  │      │  │  └─Seeds
    │  │  │      │  │      └─stubs
    │  │  │      │  ├─Eloquent
    │  │  │      │  │  ├─Attributes
    │  │  │      │  │  ├─Casts
    │  │  │      │  │  ├─Concerns
    │  │  │      │  │  ├─Factories
    │  │  │      │  │  └─Relations
    │  │  │      │  │      └─Concerns
    │  │  │      │  ├─Events
    │  │  │      │  ├─Migrations
    │  │  │      │  │  └─stubs
    │  │  │      │  ├─Query
    │  │  │      │  │  ├─Grammars
    │  │  │      │  │  └─Processors
    │  │  │      │  └─Schema
    │  │  │      │      └─Grammars
    │  │  │      ├─Encryption
    │  │  │      │  └─.github
    │  │  │      │      └─workflows
    │  │  │      ├─Events
    │  │  │      │  └─.github
    │  │  │      │      └─workflows
    │  │  │      ├─Filesystem
    │  │  │      │  └─.github
    │  │  │      │      └─workflows
    │  │  │      ├─Foundation
    │  │  │      │  ├─Auth
    │  │  │      │  │  └─Access
    │  │  │      │  ├─Bootstrap
    │  │  │      │  ├─Bus
    │  │  │      │  ├─Cloud
    │  │  │      │  ├─Concerns
    │  │  │      │  ├─Configuration
    │  │  │      │  ├─Console
    │  │  │      │  │  └─stubs
    │  │  │      │  ├─Events
    │  │  │      │  ├─Exceptions
    │  │  │      │  │  ├─Renderer
    │  │  │      │  │  │  └─Mappers
    │  │  │      │  │  ├─views
    │  │  │      │  │  └─Whoops
    │  │  │      │  ├─Http
    │  │  │      │  │  ├─Events
    │  │  │      │  │  └─Middleware
    │  │  │      │  │      └─Concerns
    │  │  │      │  ├─Providers
    │  │  │      │  ├─Queue
    │  │  │      │  ├─resources
    │  │  │      │  │  └─exceptions
    │  │  │      │  │      └─renderer
    │  │  │      │  │          ├─components
    │  │  │      │  │          │  └─icons
    │  │  │      │  │          └─dist
    │  │  │      │  ├─Routing
    │  │  │      │  ├─stubs
    │  │  │      │  ├─Support
    │  │  │      │  │  └─Providers
    │  │  │      │  ├─Testing
    │  │  │      │  │  ├─Concerns
    │  │  │      │  │  └─Traits
    │  │  │      │  └─Validation
    │  │  │      ├─Hashing
    │  │  │      │  └─.github
    │  │  │      │      └─workflows
    │  │  │      ├─Http
    │  │  │      │  ├─.github
    │  │  │      │  │  └─workflows
    │  │  │      │  ├─Client
    │  │  │      │  │  ├─Concerns
    │  │  │      │  │  ├─Events
    │  │  │      │  │  └─Promises
    │  │  │      │  ├─Concerns
    │  │  │      │  ├─Exceptions
    │  │  │      │  ├─Middleware
    │  │  │      │  ├─Resources
    │  │  │      │  │  ├─Json
    │  │  │      │  │  └─JsonApi
    │  │  │      │  │      ├─Concerns
    │  │  │      │  │      └─Exceptions
    │  │  │      │  └─Testing
    │  │  │      ├─JsonSchema
    │  │  │      │  ├─.github
    │  │  │      │  │  └─workflows
    │  │  │      │  └─Types
    │  │  │      ├─Log
    │  │  │      │  ├─.github
    │  │  │      │  │  └─workflows
    │  │  │      │  ├─Context
    │  │  │      │  │  └─Events
    │  │  │      │  └─Events
    │  │  │      ├─Macroable
    │  │  │      │  ├─.github
    │  │  │      │  │  └─workflows
    │  │  │      │  └─Traits
    │  │  │      ├─Mail
    │  │  │      │  ├─.github
    │  │  │      │  │  └─workflows
    │  │  │      │  ├─Events
    │  │  │      │  ├─Mailables
    │  │  │      │  ├─resources
    │  │  │      │  │  └─views
    │  │  │      │  │      ├─html
    │  │  │      │  │      │  └─themes
    │  │  │      │  │      └─text
    │  │  │      │  └─Transport
    │  │  │      ├─Notifications
    │  │  │      │  ├─.github
    │  │  │      │  │  └─workflows
    │  │  │      │  ├─Channels
    │  │  │      │  ├─Console
    │  │  │      │  │  └─stubs
    │  │  │      │  ├─Events
    │  │  │      │  ├─Messages
    │  │  │      │  └─resources
    │  │  │      │      └─views
    │  │  │      ├─Pagination
    │  │  │      │  ├─.github
    │  │  │      │  │  └─workflows
    │  │  │      │  └─resources
    │  │  │      │      └─views
    │  │  │      ├─Pipeline
    │  │  │      │  └─.github
    │  │  │      │      └─workflows
    │  │  │      ├─Process
    │  │  │      │  ├─.github
    │  │  │      │  │  └─workflows
    │  │  │      │  └─Exceptions
    │  │  │      ├─Queue
    │  │  │      │  ├─.github
    │  │  │      │  │  └─workflows
    │  │  │      │  ├─Attributes
    │  │  │      │  ├─Capsule
    │  │  │      │  ├─Connectors
    │  │  │      │  ├─Console
    │  │  │      │  │  ├─Concerns
    │  │  │      │  │  └─stubs
    │  │  │      │  ├─Events
    │  │  │      │  ├─Failed
    │  │  │      │  ├─Jobs
    │  │  │      │  └─Middleware
    │  │  │      ├─Redis
    │  │  │      │  ├─.github
    │  │  │      │  │  └─workflows
    │  │  │      │  ├─Connections
    │  │  │      │  ├─Connectors
    │  │  │      │  ├─Events
    │  │  │      │  └─Limiters
    │  │  │      ├─Reflection
    │  │  │      │  ├─.github
    │  │  │      │  │  └─workflows
    │  │  │      │  └─Traits
    │  │  │      ├─Routing
    │  │  │      │  ├─.github
    │  │  │      │  │  └─workflows
    │  │  │      │  ├─Console
    │  │  │      │  │  └─stubs
    │  │  │      │  ├─Contracts
    │  │  │      │  ├─Controllers
    │  │  │      │  ├─Events
    │  │  │      │  ├─Exceptions
    │  │  │      │  ├─Matching
    │  │  │      │  └─Middleware
    │  │  │      ├─Session
    │  │  │      │  ├─.github
    │  │  │      │  │  └─workflows
    │  │  │      │  ├─Console
    │  │  │      │  │  └─stubs
    │  │  │      │  └─Middleware
    │  │  │      ├─Support
    │  │  │      │  ├─.github
    │  │  │      │  │  └─workflows
    │  │  │      │  ├─Defer
    │  │  │      │  ├─Exceptions
    │  │  │      │  ├─Facades
    │  │  │      │  ├─Testing
    │  │  │      │  │  └─Fakes
    │  │  │      │  └─Traits
    │  │  │      ├─Testing
    │  │  │      │  ├─.github
    │  │  │      │  │  └─workflows
    │  │  │      │  ├─Concerns
    │  │  │      │  ├─Constraints
    │  │  │      │  ├─Exceptions
    │  │  │      │  └─Fluent
    │  │  │      │      └─Concerns
    │  │  │      ├─Translation
    │  │  │      │  ├─.github
    │  │  │      │  │  └─workflows
    │  │  │      │  └─lang
    │  │  │      │      └─en
    │  │  │      ├─Validation
    │  │  │      │  ├─.github
    │  │  │      │  │  └─workflows
    │  │  │      │  ├─Concerns
    │  │  │      │  └─Rules
    │  │  │      └─View
    │  │  │          ├─.github
    │  │  │          │  └─workflows
    │  │  │          ├─Compilers
    │  │  │          │  └─Concerns
    │  │  │          ├─Concerns
    │  │  │          ├─Engines
    │  │  │          └─Middleware
    │  │  ├─tests
    │  │  │  ├─Auth
    │  │  │  ├─Broadcasting
    │  │  │  ├─Bus
    │  │  │  ├─Cache
    │  │  │  ├─Conditionable
    │  │  │  ├─Config
    │  │  │  ├─Console
    │  │  │  │  ├─Concerns
    │  │  │  │  ├─Fixtures
    │  │  │  │  ├─Scheduling
    │  │  │  │  └─View
    │  │  │  ├─Container
    │  │  │  ├─Cookie
    │  │  │  │  └─Middleware
    │  │  │  ├─Database
    │  │  │  │  ├─Fixtures
    │  │  │  │  │  ├─Enums
    │  │  │  │  │  ├─Factories
    │  │  │  │  │  │  └─Money
    │  │  │  │  │  ├─Models
    │  │  │  │  │  │  └─Money
    │  │  │  │  │  └─Resources
    │  │  │  │  ├─migrations
    │  │  │  │  │  ├─connection_configured
    │  │  │  │  │  ├─multi_path
    │  │  │  │  │  │  ├─app
    │  │  │  │  │  │  └─vendor
    │  │  │  │  │  ├─one
    │  │  │  │  │  ├─should_run
    │  │  │  │  │  └─two
    │  │  │  │  ├─Pruning
    │  │  │  │  │  └─Models
    │  │  │  │  └─stubs
    │  │  │  ├─Encryption
    │  │  │  ├─Events
    │  │  │  ├─Filesystem
    │  │  │  ├─Foundation
    │  │  │  │  ├─Bootstrap
    │  │  │  │  ├─Cloud
    │  │  │  │  ├─Configuration
    │  │  │  │  ├─Console
    │  │  │  │  ├─Exceptions
    │  │  │  │  │  └─Renderer
    │  │  │  │  ├─fixtures
    │  │  │  │  │  ├─config
    │  │  │  │  │  ├─laravel1
    │  │  │  │  │  ├─laravel2
    │  │  │  │  │  └─vendor
    │  │  │  │  │      └─composer
    │  │  │  │  ├─Http
    │  │  │  │  │  └─Middleware
    │  │  │  │  └─Testing
    │  │  │  │      ├─Concerns
    │  │  │  │      └─Traits
    │  │  │  ├─Hashing
    │  │  │  ├─Http
    │  │  │  │  ├─fixtures
    │  │  │  │  ├─Middleware
    │  │  │  │  └─Resources
    │  │  │  │      └─JsonApi
    │  │  │  ├─Integration
    │  │  │  │  ├─Auth
    │  │  │  │  │  ├─Fixtures
    │  │  │  │  │  │  ├─Models
    │  │  │  │  │  │  │  ├─Nested
    │  │  │  │  │  │  │  └─Policies
    │  │  │  │  │  │  │      └─Nested
    │  │  │  │  │  │  └─Policies
    │  │  │  │  │  │      └─Nested
    │  │  │  │  │  └─Middleware
    │  │  │  │  ├─Broadcasting
    │  │  │  │  ├─Cache
    │  │  │  │  │  └─Fixtures
    │  │  │  │  ├─Concurrency
    │  │  │  │  │  └─Console
    │  │  │  │  ├─Console
    │  │  │  │  │  ├─Events
    │  │  │  │  │  └─Scheduling
    │  │  │  │  ├─Container
    │  │  │  │  ├─Cookie
    │  │  │  │  ├─Database
    │  │  │  │  │  ├─Fixtures
    │  │  │  │  │  ├─MariaDb
    │  │  │  │  │  ├─MySql
    │  │  │  │  │  ├─Postgres
    │  │  │  │  │  ├─Queue
    │  │  │  │  │  │  └─Fixtures
    │  │  │  │  │  ├─Sqlite
    │  │  │  │  │  │  └─Console
    │  │  │  │  │  │      └─stubs
    │  │  │  │  │  ├─SqlServer
    │  │  │  │  │  └─stubs
    │  │  │  │  ├─Encryption
    │  │  │  │  ├─Events
    │  │  │  │  ├─Filesystem
    │  │  │  │  │  └─Fixtures
    │  │  │  │  ├─Foundation
    │  │  │  │  │  ├─Configuration
    │  │  │  │  │  ├─Console
    │  │  │  │  │  ├─Exceptions
    │  │  │  │  │  ├─Fixtures
    │  │  │  │  │  │  ├─Console
    │  │  │  │  │  │  ├─EventDiscovery
    │  │  │  │  │  │  │  ├─Events
    │  │  │  │  │  │  │  ├─Listeners
    │  │  │  │  │  │  │  └─UnionListeners
    │  │  │  │  │  │  ├─Logs
    │  │  │  │  │  │  ├─MalformedErrorViews
    │  │  │  │  │  │  │  └─errors
    │  │  │  │  │  │  └─Providers
    │  │  │  │  │  ├─Support
    │  │  │  │  │  │  └─Providers
    │  │  │  │  │  │      └─fixtures
    │  │  │  │  │  └─Testing
    │  │  │  │  │      └─Concerns
    │  │  │  │  ├─Generators
    │  │  │  │  ├─Http
    │  │  │  │  │  ├─Fixtures
    │  │  │  │  │  ├─Middleware
    │  │  │  │  │  └─Resources
    │  │  │  │  │      ├─Json
    │  │  │  │  │      └─JsonApi
    │  │  │  │  │          └─Fixtures
    │  │  │  │  ├─Log
    │  │  │  │  ├─Mail
    │  │  │  │  │  └─Fixtures
    │  │  │  │  │      └─mail
    │  │  │  │  ├─Migration
    │  │  │  │  │  ├─fixtures
    │  │  │  │  │  └─pretending
    │  │  │  │  ├─Notifications
    │  │  │  │  │  └─Fixtures
    │  │  │  │  │      └─mail
    │  │  │  │  ├─Queue
    │  │  │  │  │  └─Fixtures
    │  │  │  │  │      └─Jobs
    │  │  │  │  ├─Redis
    │  │  │  │  ├─Routing
    │  │  │  │  │  ├─Fixtures
    │  │  │  │  │  │  ├─bootstrap
    │  │  │  │  │  │  │  └─cache
    │  │  │  │  │  │  └─cache
    │  │  │  │  │  └─stubs
    │  │  │  │  │      └─serializable-closure-v1
    │  │  │  │  ├─Session
    │  │  │  │  ├─Support
    │  │  │  │  │  └─Fixtures
    │  │  │  │  ├─Testing
    │  │  │  │  ├─Translation
    │  │  │  │  │  └─lang
    │  │  │  │  │      ├─en
    │  │  │  │  │      └─fr
    │  │  │  │  ├─Validation
    │  │  │  │  │  └─Rules
    │  │  │  │  └─View
    │  │  │  │      ├─anonymous-components-1
    │  │  │  │      ├─anonymous-components-2
    │  │  │  │      │  └─buttons
    │  │  │  │      ├─anonymous-components-templates
    │  │  │  │      └─templates
    │  │  │  │          ├─components
    │  │  │  │          └─partials
    │  │  │  ├─JsonSchema
    │  │  │  │  └─Fixtures
    │  │  │  │      └─Enums
    │  │  │  ├─Log
    │  │  │  ├─Mail
    │  │  │  ├─Notifications
    │  │  │  ├─Pagination
    │  │  │  │  └─Fixtures
    │  │  │  │      └─Models
    │  │  │  ├─Pipeline
    │  │  │  ├─Process
    │  │  │  ├─Queue
    │  │  │  │  └─Fixtures
    │  │  │  ├─Redis
    │  │  │  │  └─Connections
    │  │  │  ├─Routing
    │  │  │  │  └─fixtures
    │  │  │  ├─Session
    │  │  │  │  └─Middleware
    │  │  │  ├─Support
    │  │  │  │  ├─Concerns
    │  │  │  │  └─Fixtures
    │  │  │  ├─Testing
    │  │  │  │  ├─Concerns
    │  │  │  │  ├─Console
    │  │  │  │  ├─Fixtures
    │  │  │  │  ├─Fluent
    │  │  │  │  └─Stubs
    │  │  │  ├─Translation
    │  │  │  │  └─Fixtures
    │  │  │  │      └─Enums
    │  │  │  ├─Validation
    │  │  │  │  └─fixtures
    │  │  │  └─View
    │  │  │      ├─Blade
    │  │  │      ├─Concerns
    │  │  │      └─fixtures
    │  │  │          ├─namespaced
    │  │  │          └─nested
    │  │  └─types
    │  │      ├─Cache
    │  │      ├─Collections
    │  │      ├─Container
    │  │      ├─Contracts
    │  │      │  ├─Cache
    │  │      │  ├─Container
    │  │      │  ├─Foundation
    │  │      │  └─Validation
    │  │      ├─Database
    │  │      │  ├─Eloquent
    │  │      │  │  ├─Casts
    │  │      │  │  └─Factories
    │  │      │  └─Query
    │  │      ├─Foundation
    │  │      │  ├─Configuration
    │  │      │  └─Testing
    │  │      ├─Http
    │  │      │  └─Client
    │  │      ├─Log
    │  │      ├─Managers
    │  │      ├─Notifications
    │  │      ├─Pagination
    │  │      ├─Queue
    │  │      │  └─Events
    │  │      ├─Routing
    │  │      ├─Support
    │  │      │  └─Facades
    │  │      └─Testing
    │  ├─pail
    │  │  ├─.github
    │  │  │  ├─ISSUE_TEMPLATE
    │  │  │  └─workflows
    │  │  ├─art
    │  │  ├─src
    │  │  │  ├─Console
    │  │  │  │  └─Commands
    │  │  │  ├─Contracts
    │  │  │  ├─Guards
    │  │  │  ├─Printers
    │  │  │  └─ValueObjects
    │  │  │      └─Origin
    │  │  ├─tests
    │  │  │  ├─Features
    │  │  │  │  └─Filters
    │  │  │  └─Unit
    │  │  │      └─Origins
    │  │  └─workbench
    │  │      └─routes
    │  ├─pint
    │  │  ├─.github
    │  │  │  ├─ISSUE_TEMPLATE
    │  │  │  └─workflows
    │  │  ├─app
    │  │  │  ├─Actions
    │  │  │  ├─Commands
    │  │  │  ├─Contracts
    │  │  │  ├─Exceptions
    │  │  │  ├─Factories
    │  │  │  ├─Fixers
    │  │  │  ├─Output
    │  │  │  │  └─Concerns
    │  │  │  ├─Providers
    │  │  │  ├─Repositories
    │  │  │  └─ValueObjects
    │  │  ├─art
    │  │  ├─bootstrap
    │  │  ├─builds
    │  │  ├─config
    │  │  ├─overrides
    │  │  │  └─Runner
    │  │  │      └─Parallel
    │  │  ├─resources
    │  │  │  ├─boost
    │  │  │  │  └─guidelines
    │  │  │  ├─presets
    │  │  │  └─views
    │  │  │      └─issue
    │  │  ├─storage
    │  │  │  ├─app
    │  │  │  └─framework
    │  │  │      ├─cache
    │  │  │      └─views
    │  │  └─tests
    │  │      ├─Feature
    │  │      │  └─Fixers
    │  │      ├─Fixtures
    │  │      │  ├─extend
    │  │      │  ├─extend_recursive
    │  │      │  ├─finder
    │  │      │  ├─fixers
    │  │      │  ├─no-config
    │  │      │  ├─preset
    │  │      │  ├─rules
    │  │      │  ├─with-fixable-issues
    │  │      │  ├─with-invalid-configuration
    │  │      │  ├─with-non-fixable-issues
    │  │      │  ├─without-issues
    │  │      │  └─without-issues-laravel
    │  │      └─Unit
    │  │          ├─Factories
    │  │          ├─Output
    │  │          ├─Repositories
    │  │          └─ValueObjects
    │  ├─prompts
    │  │  ├─.github
    │  │  │  ├─ISSUE_TEMPLATE
    │  │  │  └─workflows
    │  │  ├─art
    │  │  ├─playground
    │  │  ├─src
    │  │  │  ├─Concerns
    │  │  │  ├─Exceptions
    │  │  │  ├─Output
    │  │  │  ├─Support
    │  │  │  └─Themes
    │  │  │      ├─Contracts
    │  │  │      └─Default
    │  │  │          └─Concerns
    │  │  └─tests
    │  │      └─Feature
    │  ├─sail
    │  │  ├─.github
    │  │  │  ├─ISSUE_TEMPLATE
    │  │  │  └─workflows
    │  │  ├─art
    │  │  ├─bin
    │  │  ├─database
    │  │  │  ├─mariadb
    │  │  │  ├─mysql
    │  │  │  └─pgsql
    │  │  ├─runtimes
    │  │  │  ├─8.0
    │  │  │  ├─8.1
    │  │  │  ├─8.2
    │  │  │  ├─8.3
    │  │  │  ├─8.4
    │  │  │  └─8.5
    │  │  ├─src
    │  │  │  └─Console
    │  │  │      └─Concerns
    │  │  └─stubs
    │  ├─serializable-closure
    │  │  ├─.github
    │  │  │  ├─ISSUE_TEMPLATE
    │  │  │  └─workflows
    │  │  ├─src
    │  │  │  ├─Contracts
    │  │  │  ├─Exceptions
    │  │  │  ├─Serializers
    │  │  │  ├─Signers
    │  │  │  └─Support
    │  │  └─tests
    │  │      └─Fixtures
    │  └─tinker
    │      ├─.github
    │      │  ├─ISSUE_TEMPLATE
    │      │  └─workflows
    │      ├─art
    │      ├─config
    │      ├─src
    │      │  └─Console
    │      └─tests
    │          └─fixtures
    │              ├─app
    │              │  ├─Baz
    │              │  └─Foo
    │              └─vendor
    │                  ├─composer
    │                  └─one
    │                      └─two
    ├─league
    │  ├─commonmark
    │  │  ├─.github
    │  │  │  ├─ISSUE_TEMPLATE
    │  │  │  └─workflows
    │  │  │      └─build-jekyll-site-action
    │  │  ├─docker
    │  │  │  └─config
    │  │  ├─docs
    │  │  │  ├─1.x
    │  │  │  │  ├─customization
    │  │  │  │  └─extensions
    │  │  │  ├─2.x
    │  │  │  │  ├─customization
    │  │  │  │  ├─extensions
    │  │  │  │  └─upgrading
    │  │  │  ├─images
    │  │  │  │  └─users
    │  │  │  ├─_data
    │  │  │  ├─_layouts
    │  │  │  └─_plugins
    │  │  ├─src
    │  │  │  ├─Delimiter
    │  │  │  │  └─Processor
    │  │  │  ├─Environment
    │  │  │  ├─Event
    │  │  │  ├─Exception
    │  │  │  ├─Extension
    │  │  │  │  ├─Attributes
    │  │  │  │  │  ├─Event
    │  │  │  │  │  ├─Node
    │  │  │  │  │  ├─Parser
    │  │  │  │  │  └─Util
    │  │  │  │  ├─Autolink
    │  │  │  │  ├─CommonMark
    │  │  │  │  │  ├─Delimiter
    │  │  │  │  │  │  └─Processor
    │  │  │  │  │  ├─Node
    │  │  │  │  │  │  ├─Block
    │  │  │  │  │  │  └─Inline
    │  │  │  │  │  ├─Parser
    │  │  │  │  │  │  ├─Block
    │  │  │  │  │  │  └─Inline
    │  │  │  │  │  └─Renderer
    │  │  │  │  │      ├─Block
    │  │  │  │  │      └─Inline
    │  │  │  │  ├─DefaultAttributes
    │  │  │  │  ├─DescriptionList
    │  │  │  │  │  ├─Event
    │  │  │  │  │  ├─Node
    │  │  │  │  │  ├─Parser
    │  │  │  │  │  └─Renderer
    │  │  │  │  ├─DisallowedRawHtml
    │  │  │  │  ├─Embed
    │  │  │  │  │  └─Bridge
    │  │  │  │  ├─ExternalLink
    │  │  │  │  ├─Footnote
    │  │  │  │  │  ├─Event
    │  │  │  │  │  ├─Node
    │  │  │  │  │  ├─Parser
    │  │  │  │  │  └─Renderer
    │  │  │  │  ├─FrontMatter
    │  │  │  │  │  ├─Data
    │  │  │  │  │  ├─Exception
    │  │  │  │  │  ├─Input
    │  │  │  │  │  ├─Listener
    │  │  │  │  │  └─Output
    │  │  │  │  ├─HeadingPermalink
    │  │  │  │  ├─Highlight
    │  │  │  │  ├─InlinesOnly
    │  │  │  │  ├─Mention
    │  │  │  │  │  └─Generator
    │  │  │  │  ├─SmartPunct
    │  │  │  │  ├─Strikethrough
    │  │  │  │  ├─Table
    │  │  │  │  ├─TableOfContents
    │  │  │  │  │  ├─Node
    │  │  │  │  │  └─Normalizer
    │  │  │  │  └─TaskList
    │  │  │  ├─Input
    │  │  │  ├─Node
    │  │  │  │  ├─Block
    │  │  │  │  ├─Inline
    │  │  │  │  └─Query
    │  │  │  ├─Normalizer
    │  │  │  ├─Output
    │  │  │  ├─Parser
    │  │  │  │  ├─Block
    │  │  │  │  └─Inline
    │  │  │  ├─Reference
    │  │  │  ├─Renderer
    │  │  │  │  ├─Block
    │  │  │  │  └─Inline
    │  │  │  ├─Util
    │  │  │  └─Xml
    │  │  └─tests
    │  │      ├─benchmark
    │  │      ├─functional
    │  │      │  ├─data
    │  │      │  │  ├─emphasis
    │  │      │  │  ├─html_input
    │  │      │  │  ├─safe
    │  │      │  │  └─safe_links
    │  │      │  ├─Delimiter
    │  │      │  └─Extension
    │  │      │      ├─Attributes
    │  │      │      │  └─data
    │  │      │      ├─Autolink
    │  │      │      │  └─xml
    │  │      │      ├─CommonMark
    │  │      │      │  └─xml
    │  │      │      ├─DefaultAttributes
    │  │      │      ├─DescriptionList
    │  │      │      ├─DisallowedRawHtml
    │  │      │      ├─Embed
    │  │      │      │  ├─Bridge
    │  │      │      │  │  ├─data
    │  │      │      │  │  └─requests
    │  │      │      │  └─data
    │  │      │      ├─ExternalLink
    │  │      │      ├─Footnote
    │  │      │      │  ├─md
    │  │      │      │  └─xml
    │  │      │      ├─FrontMatterExtension
    │  │      │      ├─HeadingPermalink
    │  │      │      ├─Highlight
    │  │      │      │  └─xml
    │  │      │      ├─InlinesOnly
    │  │      │      ├─Mention
    │  │      │      ├─SmartPunct
    │  │      │      │  └─xml
    │  │      │      ├─Strikethrough
    │  │      │      │  └─xml
    │  │      │      ├─Table
    │  │      │      │  ├─md
    │  │      │      │  └─xml
    │  │      │      ├─TableOfContents
    │  │      │      │  ├─md
    │  │      │      │  └─xml
    │  │      │      └─TaskList
    │  │      │          └─xml
    │  │      ├─pathological
    │  │      ├─phpstan
    │  │      └─unit
    │  │          ├─Delimiter
    │  │          ├─Environment
    │  │          ├─Event
    │  │          ├─Extension
    │  │          │  ├─Attributes
    │  │          │  │  └─Util
    │  │          │  ├─CommonMark
    │  │          │  │  ├─Node
    │  │          │  │  │  ├─Block
    │  │          │  │  │  └─Inline
    │  │          │  │  ├─Parser
    │  │          │  │  │  ├─Block
    │  │          │  │  │  └─Inline
    │  │          │  │  └─Renderer
    │  │          │  │      ├─Block
    │  │          │  │      └─Inline
    │  │          │  ├─DescriptionList
    │  │          │  │  ├─Node
    │  │          │  │  └─Renderer
    │  │          │  ├─DisallowedRawHtml
    │  │          │  ├─Embed
    │  │          │  ├─ExternalLink
    │  │          │  ├─Footnote
    │  │          │  │  └─Renderer
    │  │          │  ├─FrontMatter
    │  │          │  │  ├─Data
    │  │          │  │  ├─Exception
    │  │          │  │  ├─Input
    │  │          │  │  └─Output
    │  │          │  ├─HeadingPermalink
    │  │          │  ├─Highlight
    │  │          │  ├─Mention
    │  │          │  │  └─Generator
    │  │          │  ├─SmartPunct
    │  │          │  ├─Strikethrough
    │  │          │  ├─Table
    │  │          │  └─TaskList
    │  │          ├─Input
    │  │          ├─Node
    │  │          │  ├─Block
    │  │          │  └─Inline
    │  │          ├─Normalizer
    │  │          ├─Output
    │  │          ├─Parser
    │  │          │  └─Inline
    │  │          ├─Reference
    │  │          ├─Renderer
    │  │          │  ├─Block
    │  │          │  └─Inline
    │  │          ├─Util
    │  │          └─Xml
    │  ├─config
    │  │  ├─.github
    │  │  │  ├─ISSUE_TEMPLATE
    │  │  │  └─workflows
    │  │  │      └─build-jekyll-site-action
    │  │  ├─docs
    │  │  │  ├─1.0
    │  │  │  ├─1.1
    │  │  │  ├─_data
    │  │  │  ├─_layouts
    │  │  │  └─_plugins
    │  │  ├─src
    │  │  │  └─Exception
    │  │  └─tests
    │  │      └─Exception
    │  ├─flysystem
    │  │  ├─.github
    │  │  │  ├─ISSUE_TEMPLATE
    │  │  │  └─workflows
    │  │  ├─bin
    │  │  ├─src
    │  │  │  ├─AdapterTestUtilities
    │  │  │  │  ├─.github
    │  │  │  │  │  └─workflows
    │  │  │  │  └─test_files
    │  │  │  ├─AsyncAwsS3
    │  │  │  │  └─.github
    │  │  │  │      └─workflows
    │  │  │  ├─AwsS3V3
    │  │  │  │  └─.github
    │  │  │  │      └─workflows
    │  │  │  ├─AzureBlobStorage
    │  │  │  │  └─.github
    │  │  │  │      └─workflows
    │  │  │  ├─Ftp
    │  │  │  │  └─.github
    │  │  │  │      └─workflows
    │  │  │  ├─GoogleCloudStorage
    │  │  │  │  └─.github
    │  │  │  │      └─workflows
    │  │  │  ├─GridFS
    │  │  │  │  └─.github
    │  │  │  │      └─workflows
    │  │  │  ├─InMemory
    │  │  │  │  └─.github
    │  │  │  │      └─workflows
    │  │  │  ├─Local
    │  │  │  │  └─.github
    │  │  │  │      └─workflows
    │  │  │  ├─PathPrefixing
    │  │  │  │  └─.github
    │  │  │  │      └─workflows
    │  │  │  ├─PhpseclibV2
    │  │  │  │  └─.github
    │  │  │  │      └─workflows
    │  │  │  ├─PhpseclibV3
    │  │  │  │  └─.github
    │  │  │  │      └─workflows
    │  │  │  ├─ReadOnly
    │  │  │  │  └─.github
    │  │  │  │      └─workflows
    │  │  │  ├─UnixVisibility
    │  │  │  ├─UrlGeneration
    │  │  │  ├─WebDAV
    │  │  │  │  ├─.github
    │  │  │  │  │  └─workflows
    │  │  │  │  └─resources
    │  │  │  └─ZipArchive
    │  │  │      └─.github
    │  │  │          └─workflows
    │  │  └─test_files
    │  │      ├─sftp
    │  │      └─toxiproxy
    │  ├─flysystem-local
    │  │  └─.github
    │  │      └─workflows
    │  ├─mime-type-detection
    │  │  ├─.github
    │  │  │  └─workflows
    │  │  ├─bin
    │  │  ├─src
    │  │  │  └─Generation
    │  │  └─test_files
    │  ├─uri
    │  │  ├─.github
    │  │  │  └─workflows
    │  │  └─UriTemplate
    │  └─uri-interfaces
    │      ├─.github
    │      │  └─workflows
    │      ├─Contracts
    │      ├─Exceptions
    │      ├─Idna
    │      ├─IPv4
    │      ├─IPv6
    │      └─KeyValuePair
    ├─mockery
    │  └─mockery
    │      ├─.github
    │      │  ├─ISSUE_TEMPLATE
    │      │  └─workflows
    │      ├─docs
    │      │  ├─cookbook
    │      │  ├─getting_started
    │      │  ├─mockery
    │      │  ├─reference
    │      │  └─_static
    │      ├─fixtures
    │      ├─library
    │      │  └─Mockery
    │      │      ├─Adapter
    │      │      │  └─Phpunit
    │      │      ├─CountValidator
    │      │      ├─Exception
    │      │      ├─Generator
    │      │      │  └─StringManipulation
    │      │      │      └─Pass
    │      │      ├─Loader
    │      │      └─Matcher
    │      ├─tests
    │      │  ├─Fixture
    │      │  │  ├─PHP74
    │      │  │  │  └─Regression
    │      │  │  │      └─Issue1402
    │      │  │  ├─PHP81
    │      │  │  ├─PHP82
    │      │  │  └─PHP83
    │      │  ├─Mockery
    │      │  │  ├─Adapter
    │      │  │  │  └─Phpunit
    │      │  │  ├─DummyClasses
    │      │  │  ├─Fixtures
    │      │  │  ├─Generator
    │      │  │  │  └─StringManipulation
    │      │  │  │      └─Pass
    │      │  │  ├─Loader
    │      │  │  ├─Matcher
    │      │  │  ├─Stubs
    │      │  │  └─_files
    │      │  ├─PHP80
    │      │  ├─PHP81
    │      │  ├─PHP82
    │      │  └─Unit
    │      │      ├─PHP80
    │      │      ├─PHP81
    │      │      ├─PHP82
    │      │      ├─PHP83
    │      │      └─Regression
    │      └─tools
    ├─monolog
    │  └─monolog
    │      ├─.github
    │      │  ├─ISSUE_TEMPLATE
    │      │  └─workflows
    │      ├─doc
    │      ├─src
    │      │  └─Monolog
    │      │      ├─Attribute
    │      │      ├─Formatter
    │      │      ├─Handler
    │      │      │  ├─Curl
    │      │      │  ├─FingersCrossed
    │      │      │  ├─Slack
    │      │      │  └─SyslogUdp
    │      │      ├─Processor
    │      │      └─Test
    │      └─tests
    │          └─Monolog
    │              ├─Attribute
    │              ├─Formatter
    │              ├─Handler
    │              │  ├─Fixtures
    │              │  └─Slack
    │              └─Processor
    ├─myclabs
    │  └─deep-copy
    │      ├─.github
    │      │  └─workflows
    │      ├─doc
    │      ├─fixtures
    │      │  ├─f001
    │      │  ├─f002
    │      │  ├─f003
    │      │  ├─f004
    │      │  ├─f005
    │      │  ├─f006
    │      │  ├─f007
    │      │  ├─f008
    │      │  ├─f009
    │      │  ├─f011
    │      │  ├─f012
    │      │  ├─f013
    │      │  └─f014
    │      ├─src
    │      │  └─DeepCopy
    │      │      ├─Exception
    │      │      ├─Filter
    │      │      │  └─Doctrine
    │      │      ├─Matcher
    │      │      │  └─Doctrine
    │      │      ├─Reflection
    │      │      ├─TypeFilter
    │      │      │  ├─Date
    │      │      │  └─Spl
    │      │      └─TypeMatcher
    │      └─tests
    │          └─DeepCopyTest
    │              ├─Filter
    │              │  └─Doctrine
    │              ├─Matcher
    │              │  └─Doctrine
    │              ├─Reflection
    │              ├─TypeFilter
    │              │  ├─Date
    │              │  └─Spl
    │              └─TypeMatcher
    ├─nesbot
    │  └─carbon
    │      ├─.github
    │      │  ├─ISSUE_TEMPLATE
    │      │  └─workflows
    │      ├─bin
    │      ├─lazy
    │      │  └─Carbon
    │      │      └─MessageFormatter
    │      ├─src
    │      │  └─Carbon
    │      │      ├─Cli
    │      │      ├─Constants
    │      │      ├─Exceptions
    │      │      ├─Lang
    │      │      ├─Laravel
    │      │      ├─List
    │      │      ├─MessageFormatter
    │      │      ├─PHPStan
    │      │      └─Traits
    │      └─tests
    │          ├─Carbon
    │          │  ├─Exceptions
    │          │  └─Fixtures
    │          ├─CarbonImmutable
    │          │  └─Fixtures
    │          ├─CarbonInterval
    │          │  └─Fixtures
    │          ├─CarbonPeriod
    │          │  └─Fixtures
    │          ├─CarbonPeriodImmutable
    │          ├─CarbonTimeZone
    │          │  └─Fixtures
    │          ├─Cli
    │          ├─CommonTraits
    │          ├─Doctrine
    │          ├─Factory
    │          ├─Fixtures
    │          ├─Jenssegers
    │          ├─Language
    │          ├─Laravel
    │          ├─Localization
    │          ├─PHPStan
    │          ├─PHPUnit
    │          └─Unit
    ├─nette
    │  ├─schema
    │  │  ├─.github
    │  │  │  └─workflows
    │  │  ├─src
    │  │  │  └─Schema
    │  │  │      └─Elements
    │  │  └─tests
    │  │      ├─Schema
    │  │      │  └─fixtures
    │  │      └─types
    │  └─utils
    │      ├─.github
    │      │  └─workflows
    │      ├─src
    │      │  ├─Iterators
    │      │  └─Utils
    │      └─tests
    │          ├─Iterators
    │          ├─types
    │          └─Utils
    │              ├─expected
    │              ├─fixtures.finder
    │              │  ├─images
    │              │  └─subdir
    │              │      └─subdir2
    │              ├─fixtures.finder2
    │              │  ├─x
    │              │  └─[x]
    │              ├─fixtures.finder3
    │              │  ├─another_subdir
    │              │  └─subdir
    │              ├─fixtures.images
    │              ├─fixtures.process
    │              └─fixtures.reflection
    ├─nikic
    │  └─php-parser
    │      ├─.github
    │      │  └─workflows
    │      ├─bin
    │      ├─doc
    │      │  └─component
    │      ├─grammar
    │      ├─lib
    │      │  └─PhpParser
    │      │      ├─Builder
    │      │      ├─Comment
    │      │      ├─ErrorHandler
    │      │      ├─Internal
    │      │      ├─Lexer
    │      │      │  └─TokenEmulator
    │      │      ├─Node
    │      │      │  ├─Expr
    │      │      │  │  ├─AssignOp
    │      │      │  │  ├─BinaryOp
    │      │      │  │  └─Cast
    │      │      │  ├─Name
    │      │      │  ├─Scalar
    │      │      │  │  └─MagicConst
    │      │      │  └─Stmt
    │      │      │      └─TraitUseAdaptation
    │      │      ├─NodeVisitor
    │      │      ├─Parser
    │      │      └─PrettyPrinter
    │      ├─test
    │      │  ├─code
    │      │  │  ├─formatPreservation
    │      │  │  ├─parser
    │      │  │  │  ├─errorHandling
    │      │  │  │  ├─expr
    │      │  │  │  │  ├─fetchAndCall
    │      │  │  │  │  └─uvs
    │      │  │  │  ├─scalar
    │      │  │  │  └─stmt
    │      │  │  │      ├─class
    │      │  │  │      ├─function
    │      │  │  │      ├─generator
    │      │  │  │      ├─loop
    │      │  │  │      └─namespace
    │      │  │  └─prettyPrinter
    │      │  │      ├─expr
    │      │  │      └─stmt
    │      │  ├─fixtures
    │      │  └─PhpParser
    │      │      ├─Builder
    │      │      ├─ErrorHandler
    │      │      ├─Internal
    │      │      ├─Lexer
    │      │      ├─Node
    │      │      │  ├─Expr
    │      │      │  ├─Scalar
    │      │      │  └─Stmt
    │      │      ├─NodeVisitor
    │      │      └─Parser
    │      ├─test_old
    │      └─tools
    │          └─fuzzing
    ├─nunomaduro
    │  ├─collision
    │  │  ├─.github
    │  │  │  └─workflows
    │  │  ├─.temp
    │  │  ├─docs
    │  │  ├─scripts
    │  │  ├─src
    │  │  │  ├─Adapters
    │  │  │  │  ├─Laravel
    │  │  │  │  │  ├─Commands
    │  │  │  │  │  └─Exceptions
    │  │  │  │  └─Phpunit
    │  │  │  │      ├─Printers
    │  │  │  │      ├─Subscribers
    │  │  │  │      └─Support
    │  │  │  ├─Contracts
    │  │  │  │  └─Adapters
    │  │  │  │      └─Phpunit
    │  │  │  ├─Exceptions
    │  │  │  └─SolutionsRepositories
    │  │  └─tests
    │  │      ├─FakeProgram
    │  │      ├─LaravelApp
    │  │      │  ├─app
    │  │      │  │  ├─Console
    │  │      │  │  │  └─Commands
    │  │      │  │  ├─Http
    │  │      │  │  │  └─Controllers
    │  │      │  │  ├─Models
    │  │      │  │  └─Providers
    │  │      │  ├─bootstrap
    │  │      │  │  └─cache
    │  │      │  ├─config
    │  │      │  ├─database
    │  │      │  │  ├─factories
    │  │      │  │  ├─migrations
    │  │      │  │  └─seeders
    │  │      │  ├─public
    │  │      │  ├─resources
    │  │      │  │  ├─css
    │  │      │  │  ├─js
    │  │      │  │  └─views
    │  │      │  ├─routes
    │  │      │  ├─storage
    │  │      │  │  ├─app
    │  │      │  │  │  └─public
    │  │      │  │  ├─framework
    │  │      │  │  │  ├─cache
    │  │      │  │  │  │  └─data
    │  │      │  │  │  ├─sessions
    │  │      │  │  │  ├─testing
    │  │      │  │  │  └─views
    │  │      │  │  └─logs
    │  │      │  ├─tests
    │  │      │  │  ├─Feature
    │  │      │  │  └─Unit
    │  │      │  └─vendor
    │  │      ├─Printer
    │  │      ├─TestCaseWithStdoutOutput
    │  │      └─Unit
    │  │          └─Adapters
    │  └─termwind
    │      ├─.github
    │      │  └─workflows
    │      ├─art
    │      ├─docker
    │      ├─src
    │      │  ├─Actions
    │      │  ├─Components
    │      │  ├─Enums
    │      │  ├─Exceptions
    │      │  ├─Helpers
    │      │  ├─Html
    │      │  ├─Laravel
    │      │  ├─Repositories
    │      │  └─ValueObjects
    │      └─tests
    ├─phar-io
    │  ├─manifest
    │  │  ├─.github
    │  │  │  └─workflows
    │  │  ├─build
    │  │  ├─examples
    │  │  ├─src
    │  │  │  ├─exceptions
    │  │  │  ├─values
    │  │  │  └─xml
    │  │  ├─tests
    │  │  │  ├─exceptions
    │  │  │  ├─values
    │  │  │  ├─xml
    │  │  │  └─_fixture
    │  │  └─tools
    │  │      └─php-cs-fixer.d
    │  └─version
    │      ├─src
    │      │  ├─constraints
    │      │  └─exceptions
    │      └─tests
    │          ├─Integration
    │          └─Unit
    ├─phpoption
    │  └─phpoption
    │      ├─.github
    │      │  └─workflows
    │      ├─src
    │      │  └─PhpOption
    │      ├─tests
    │      │  └─PhpOption
    │      │      └─Tests
    │      └─vendor-bin
    │          └─phpstan
    ├─phpunit
    │  ├─php-code-coverage
    │  │  ├─.github
    │  │  │  └─workflows
    │  │  ├─.phive
    │  │  ├─build
    │  │  │  └─scripts
    │  │  ├─src
    │  │  │  ├─Data
    │  │  │  ├─Driver
    │  │  │  ├─Exception
    │  │  │  ├─Node
    │  │  │  ├─Report
    │  │  │  │  ├─Html
    │  │  │  │  │  └─Renderer
    │  │  │  │  │      └─Template
    │  │  │  │  │          ├─css
    │  │  │  │  │          ├─icons
    │  │  │  │  │          └─js
    │  │  │  │  └─Xml
    │  │  │  ├─StaticAnalysis
    │  │  │  ├─TestSize
    │  │  │  ├─TestStatus
    │  │  │  └─Util
    │  │  ├─tests
    │  │  │  ├─tests
    │  │  │  │  ├─Data
    │  │  │  │  ├─Driver
    │  │  │  │  ├─Exception
    │  │  │  │  ├─Node
    │  │  │  │  ├─Report
    │  │  │  │  │  └─Html
    │  │  │  │  ├─StaticAnalysis
    │  │  │  │  └─Util
    │  │  │  └─_files
    │  │  │      ├─filter
    │  │  │      └─Report
    │  │  │          ├─HTML
    │  │  │          │  ├─CoverageForBankAccount
    │  │  │          │  ├─CoverageForClassWithAnonymousFunction
    │  │  │          │  ├─CoverageForFileWithIgnoredLines
    │  │  │          │  ├─PathCoverageForBankAccount
    │  │  │          │  └─PathCoverageForSourceWithoutNamespace
    │  │  │          └─XML
    │  │  │              ├─CoverageForBankAccount
    │  │  │              ├─CoverageForClassWithAnonymousFunction
    │  │  │              └─CoverageForFileWithIgnoredLines
    │  │  └─tools
    │  ├─php-file-iterator
    │  │  ├─.github
    │  │  │  └─workflows
    │  │  ├─.phive
    │  │  ├─build
    │  │  │  └─scripts
    │  │  ├─src
    │  │  ├─tests
    │  │  │  ├─fixture
    │  │  │  │  ├─a
    │  │  │  │  │  └─c
    │  │  │  │  │      ├─.hidden
    │  │  │  │  │      └─d
    │  │  │  │  │          └─i
    │  │  │  │  └─b
    │  │  │  │      ├─e
    │  │  │  │      │  ├─g
    │  │  │  │      │  │  └─i
    │  │  │  │      │  └─i
    │  │  │  │      └─f
    │  │  │  │          └─h
    │  │  │  │              └─i
    │  │  │  └─unit
    │  │  └─tools
    │  ├─php-invoker
    │  │  ├─.github
    │  │  │  └─workflows
    │  │  ├─.phive
    │  │  ├─build
    │  │  │  └─scripts
    │  │  ├─src
    │  │  │  └─exceptions
    │  │  ├─tests
    │  │  │  ├─unit
    │  │  │  └─_fixture
    │  │  └─tools
    │  ├─php-text-template
    │  │  ├─.github
    │  │  │  └─workflows
    │  │  ├─.phive
    │  │  ├─.psalm
    │  │  ├─build
    │  │  │  └─scripts
    │  │  ├─src
    │  │  │  └─exceptions
    │  │  ├─tests
    │  │  │  └─_fixture
    │  │  └─tools
    │  ├─php-timer
    │  │  ├─.github
    │  │  │  └─workflows
    │  │  ├─.phive
    │  │  ├─build
    │  │  │  └─scripts
    │  │  ├─src
    │  │  │  └─exceptions
    │  │  ├─tests
    │  │  └─tools
    │  └─phpunit
    │      ├─.github
    │      │  ├─ISSUE_TEMPLATE
    │      │  ├─PULL_REQUEST_TEMPLATE
    │      │  └─workflows
    │      ├─.phive
    │      ├─build
    │      │  ├─config
    │      │  ├─scripts
    │      │  │  └─phar-set-timestamps
    │      │  │      └─vendor
    │      │  │          ├─composer
    │      │  │          └─seld
    │      │  │              └─phar-utils
    │      │  │                  └─src
    │      │  ├─templates
    │      │  └─test-extension
    │      │      └─src
    │      ├─schema
    │      ├─src
    │      │  ├─Event
    │      │  │  ├─Dispatcher
    │      │  │  ├─Emitter
    │      │  │  ├─Events
    │      │  │  │  ├─Application
    │      │  │  │  ├─Test
    │      │  │  │  │  ├─HookMethod
    │      │  │  │  │  ├─Issue
    │      │  │  │  │  ├─Lifecycle
    │      │  │  │  │  ├─Outcome
    │      │  │  │  │  └─TestDouble
    │      │  │  │  ├─TestRunner
    │      │  │  │  └─TestSuite
    │      │  │  ├─Exception
    │      │  │  └─Value
    │      │  │      ├─Runtime
    │      │  │      ├─Telemetry
    │      │  │      ├─Test
    │      │  │      │  ├─Issue
    │      │  │      │  └─TestData
    │      │  │      └─TestSuite
    │      │  ├─Framework
    │      │  │  ├─Assert
    │      │  │  ├─Attributes
    │      │  │  ├─Constraint
    │      │  │  │  ├─Boolean
    │      │  │  │  ├─Cardinality
    │      │  │  │  ├─Equality
    │      │  │  │  ├─Exception
    │      │  │  │  ├─Filesystem
    │      │  │  │  ├─Math
    │      │  │  │  ├─Object
    │      │  │  │  ├─Operator
    │      │  │  │  ├─String
    │      │  │  │  ├─Traversable
    │      │  │  │  └─Type
    │      │  │  ├─Exception
    │      │  │  │  ├─Incomplete
    │      │  │  │  ├─ObjectEquals
    │      │  │  │  └─Skipped
    │      │  │  ├─MockObject
    │      │  │  │  ├─Exception
    │      │  │  │  ├─Generator
    │      │  │  │  │  ├─Exception
    │      │  │  │  │  └─templates
    │      │  │  │  └─Runtime
    │      │  │  │      ├─Api
    │      │  │  │      ├─Builder
    │      │  │  │      ├─Interface
    │      │  │  │      ├─PropertyHook
    │      │  │  │      ├─Rule
    │      │  │  │      └─Stub
    │      │  │  ├─TestRunner
    │      │  │  │  └─templates
    │      │  │  ├─TestSize
    │      │  │  └─TestStatus
    │      │  ├─Logging
    │      │  │  ├─JUnit
    │      │  │  │  └─Subscriber
    │      │  │  ├─TeamCity
    │      │  │  │  └─Subscriber
    │      │  │  └─TestDox
    │      │  │      └─TestResult
    │      │  │          └─Subscriber
    │      │  ├─Metadata
    │      │  │  ├─Api
    │      │  │  ├─Exception
    │      │  │  ├─Parser
    │      │  │  │  └─Annotation
    │      │  │  └─Version
    │      │  ├─Runner
    │      │  │  ├─Baseline
    │      │  │  │  ├─Exception
    │      │  │  │  └─Subscriber
    │      │  │  ├─DeprecationCollector
    │      │  │  │  └─Subscriber
    │      │  │  ├─Exception
    │      │  │  ├─Extension
    │      │  │  ├─Filter
    │      │  │  ├─GarbageCollection
    │      │  │  │  └─Subscriber
    │      │  │  ├─HookMethod
    │      │  │  ├─PHPT
    │      │  │  │  └─templates
    │      │  │  ├─ResultCache
    │      │  │  │  └─Subscriber
    │      │  │  └─TestResult
    │      │  │      └─Subscriber
    │      │  ├─TextUI
    │      │  │  ├─Command
    │      │  │  │  └─Commands
    │      │  │  ├─Configuration
    │      │  │  │  ├─Cli
    │      │  │  │  ├─Exception
    │      │  │  │  ├─Value
    │      │  │  │  └─Xml
    │      │  │  │      ├─CodeCoverage
    │      │  │  │      │  └─Report
    │      │  │  │      ├─Logging
    │      │  │  │      │  └─TestDox
    │      │  │  │      ├─Migration
    │      │  │  │      │  └─Migrations
    │      │  │  │      ├─SchemaDetector
    │      │  │  │      └─Validator
    │      │  │  ├─Exception
    │      │  │  └─Output
    │      │  │      ├─Default
    │      │  │      │  └─ProgressPrinter
    │      │  │      │      └─Subscriber
    │      │  │      ├─Printer
    │      │  │      └─TestDox
    │      │  └─Util
    │      │      ├─Exception
    │      │      ├─Http
    │      │      ├─PHP
    │      │      └─Xml
    │      ├─tests
    │      │  ├─end-to-end
    │      │  │  ├─baseline
    │      │  │  ├─check-php-configuration
    │      │  │  ├─cli
    │      │  │  │  ├─columns
    │      │  │  │  ├─do-not-fail-on
    │      │  │  │  ├─exclude-filter
    │      │  │  │  ├─fail-on
    │      │  │  │  ├─filter
    │      │  │  │  ├─filter-error-handler
    │      │  │  │  ├─group
    │      │  │  │  ├─help
    │      │  │  │  ├─list-suites
    │      │  │  │  ├─list-test-files
    │      │  │  │  ├─listing-tests-and-groups
    │      │  │  │  └─stop-on
    │      │  │  ├─data-provider
    │      │  │  ├─error-handler
    │      │  │  │  └─_files
    │      │  │  │      ├─baseline
    │      │  │  │      │  ├─src
    │      │  │  │      │  └─tests
    │      │  │  │      ├─deprecation-trigger-function
    │      │  │  │      │  ├─src
    │      │  │  │      │  ├─tests
    │      │  │  │      │  └─vendor
    │      │  │  │      ├─deprecation-trigger-method
    │      │  │  │      │  ├─src
    │      │  │  │      │  ├─tests
    │      │  │  │      │  └─vendor
    │      │  │  │      ├─direct-trigger-with-triggers-configured
    │      │  │  │      │  ├─src
    │      │  │  │      │  ├─tests
    │      │  │  │      │  └─vendor
    │      │  │  │      ├─invalid-deprecation-trigger
    │      │  │  │      │  └─tests
    │      │  │  │      ├─php-deprecation
    │      │  │  │      │  ├─src
    │      │  │  │      │  ├─tests
    │      │  │  │      │  └─vendor
    │      │  │  │      ├─trigger-identification-disabled
    │      │  │  │      │  ├─src
    │      │  │  │      │  ├─tests
    │      │  │  │      │  └─vendor
    │      │  │  │      └─user-deprecation
    │      │  │  │          ├─src
    │      │  │  │          ├─tests
    │      │  │  │          └─vendor
    │      │  │  ├─event
    │      │  │  │  └─_files
    │      │  │  │      ├─custom-error-handler-registered-in-bootstrap-is-not-overwritten-by-phpunit
    │      │  │  │      │  └─tests
    │      │  │  │      ├─custom-failure-interface
    │      │  │  │      ├─error-handler-can-be-disabled
    │      │  │  │      │  ├─src
    │      │  │  │      │  └─tests
    │      │  │  │      ├─invalid-coverage-metadata
    │      │  │  │      │  ├─src
    │      │  │  │      │  └─tests
    │      │  │  │      ├─skip-in-before-class
    │      │  │  │      ├─test-risky-code-coverage
    │      │  │  │      │  ├─src
    │      │  │  │      │  └─tests
    │      │  │  │      └─test-risky-depends-on-larger-test
    │      │  │  ├─execution-order
    │      │  │  │  └─fixture
    │      │  │  │      ├─empty-test-suite
    │      │  │  │      ├─test-classes
    │      │  │  │      ├─test-classes-with-defects
    │      │  │  │      ├─test-classes-with-different-sizes
    │      │  │  │      ├─test-classes-with-duration
    │      │  │  │      ├─test-methods-with-defects
    │      │  │  │      ├─test-methods-with-dependencies
    │      │  │  │      ├─test-methods-with-different-sizes
    │      │  │  │      └─test-methods-with-duration
    │      │  │  ├─extension-cli
    │      │  │  │  └─_files
    │      │  │  │      ├─class-does-not-exist
    │      │  │  │      │  └─tests
    │      │  │  │      ├─class-does-not-implement-interface
    │      │  │  │      │  ├─src
    │      │  │  │      │  └─tests
    │      │  │  │      ├─exception-in-extension-bootstrap-method
    │      │  │  │      │  ├─src
    │      │  │  │      │  └─tests
    │      │  │  │      ├─exception-in-extension-constructor
    │      │  │  │      │  ├─src
    │      │  │  │      │  └─tests
    │      │  │  │      ├─exception-in-extension-subscriber
    │      │  │  │      │  ├─src
    │      │  │  │      │  └─tests
    │      │  │  │      └─extension-bootstrap
    │      │  │  │          ├─src
    │      │  │  │          └─tests
    │      │  │  ├─extension-xml
    │      │  │  │  └─_files
    │      │  │  │      ├─class-does-not-exist
    │      │  │  │      │  └─tests
    │      │  │  │      ├─class-does-not-implement-interface
    │      │  │  │      │  ├─src
    │      │  │  │      │  └─tests
    │      │  │  │      ├─exception-in-extension-bootstrap-method
    │      │  │  │      │  ├─src
    │      │  │  │      │  └─tests
    │      │  │  │      ├─exception-in-extension-constructor
    │      │  │  │      │  ├─src
    │      │  │  │      │  └─tests
    │      │  │  │      ├─exception-in-extension-subscriber
    │      │  │  │      │  ├─src
    │      │  │  │      │  └─tests
    │      │  │  │      └─extension-bootstrap
    │      │  │  │          ├─src
    │      │  │  │          └─tests
    │      │  │  ├─generic
    │      │  │  │  ├─abstract-test-class
    │      │  │  │  └─_files
    │      │  │  ├─groups-from-configuration
    │      │  │  │  └─_files
    │      │  │  │      └─tests
    │      │  │  │          ├─bar-baz
    │      │  │  │          └─foo
    │      │  │  ├─logging
    │      │  │  │  ├─junit
    │      │  │  │  ├─teamcity
    │      │  │  │  ├─testdox
    │      │  │  │  └─_files
    │      │  │  │      └─teamcity-warning
    │      │  │  │          └─tests
    │      │  │  ├─metadata
    │      │  │  ├─migration
    │      │  │  │  └─_files
    │      │  │  │      ├─migration-from-100
    │      │  │  │      ├─migration-from-110
    │      │  │  │      ├─migration-from-85
    │      │  │  │      ├─migration-from-92
    │      │  │  │      ├─migration-from-95
    │      │  │  │      ├─possibility-to-migrate-from-100-is-detected
    │      │  │  │      │  ├─src
    │      │  │  │      │  └─tests
    │      │  │  │      ├─possibility-to-migrate-from-85-is-detected
    │      │  │  │      │  ├─src
    │      │  │  │      │  └─tests
    │      │  │  │      ├─possibility-to-migrate-from-92-is-detected
    │      │  │  │      │  ├─src
    │      │  │  │      │  └─tests
    │      │  │  │      ├─possibility-to-migrate-from-95-is-detected
    │      │  │  │      │  ├─src
    │      │  │  │      │  └─tests
    │      │  │  │      └─unsupported-schema
    │      │  │  ├─mock-objects
    │      │  │  │  ├─generator
    │      │  │  │  └─mock-method
    │      │  │  ├─phar
    │      │  │  │  ├─src
    │      │  │  │  └─tests
    │      │  │  │      ├─phpt
    │      │  │  │      └─standard
    │      │  │  ├─phpt
    │      │  │  ├─regression
    │      │  │  │  ├─1149
    │      │  │  │  ├─1335
    │      │  │  │  ├─1337
    │      │  │  │  ├─1348
    │      │  │  │  ├─1374
    │      │  │  │  ├─1437
    │      │  │  │  ├─1471
    │      │  │  │  ├─1570
    │      │  │  │  ├─2085
    │      │  │  │  ├─2137
    │      │  │  │  ├─2145
    │      │  │  │  ├─2155
    │      │  │  │  ├─2158
    │      │  │  │  ├─2380
    │      │  │  │  ├─2435
    │      │  │  │  ├─2448
    │      │  │  │  ├─2724
    │      │  │  │  ├─2725
    │      │  │  │  ├─2731
    │      │  │  │  ├─2811
    │      │  │  │  ├─2830
    │      │  │  │  ├─2972
    │      │  │  │  ├─3093
    │      │  │  │  ├─3156
    │      │  │  │  ├─3881
    │      │  │  │  ├─3904
    │      │  │  │  ├─3983
    │      │  │  │  ├─4232
    │      │  │  │  ├─433
    │      │  │  │  ├─4347
    │      │  │  │  ├─4376
    │      │  │  │  │  └─tests
    │      │  │  │  ├─4391
    │      │  │  │  ├─445
    │      │  │  │  ├─4498
    │      │  │  │  ├─4620
    │      │  │  │  ├─4625
    │      │  │  │  ├─498
    │      │  │  │  ├─5020
    │      │  │  │  │  └─Under
    │      │  │  │  │      └─Score
    │      │  │  │  ├─503
    │      │  │  │  ├─5138
    │      │  │  │  │  └─tests
    │      │  │  │  ├─5157
    │      │  │  │  │  └─tests
    │      │  │  │  ├─5165
    │      │  │  │  ├─5172
    │      │  │  │  │  └─tests
    │      │  │  │  ├─5178
    │      │  │  │  ├─5192
    │      │  │  │  │  └─tests
    │      │  │  │  ├─5210
    │      │  │  │  ├─5218
    │      │  │  │  │  ├─src
    │      │  │  │  │  └─tests
    │      │  │  │  ├─5234
    │      │  │  │  │  └─tests
    │      │  │  │  ├─5258
    │      │  │  │  ├─5278
    │      │  │  │  ├─5287
    │      │  │  │  │  ├─A
    │      │  │  │  │  ├─B
    │      │  │  │  │  └─C
    │      │  │  │  ├─5288
    │      │  │  │  ├─5340
    │      │  │  │  ├─5342
    │      │  │  │  ├─5351
    │      │  │  │  │  ├─src
    │      │  │  │  │  └─tests
    │      │  │  │  ├─5364
    │      │  │  │  ├─5451
    │      │  │  │  ├─5456
    │      │  │  │  ├─5493
    │      │  │  │  ├─5498
    │      │  │  │  ├─5561
    │      │  │  │  ├─5567
    │      │  │  │  ├─5574
    │      │  │  │  ├─5592
    │      │  │  │  ├─5614
    │      │  │  │  ├─5616
    │      │  │  │  ├─5760
    │      │  │  │  ├─5764
    │      │  │  │  │  └─tests
    │      │  │  │  ├─5771
    │      │  │  │  ├─5795
    │      │  │  │  ├─5807
    │      │  │  │  │  ├─src
    │      │  │  │  │  └─tests
    │      │  │  │  ├─581
    │      │  │  │  ├─5822
    │      │  │  │  │  ├─src
    │      │  │  │  │  └─tests
    │      │  │  │  ├─5844
    │      │  │  │  ├─5875
    │      │  │  │  ├─5884
    │      │  │  │  │  ├─src
    │      │  │  │  │  └─tests
    │      │  │  │  ├─5891
    │      │  │  │  ├─5898
    │      │  │  │  ├─5908
    │      │  │  │  ├─5943
    │      │  │  │  │  └─tests
    │      │  │  │  │      ├─a
    │      │  │  │  │      └─b
    │      │  │  │  ├─5949
    │      │  │  │  ├─5965
    │      │  │  │  ├─5976
    │      │  │  │  ├─6094
    │      │  │  │  ├─6095
    │      │  │  │  ├─6098
    │      │  │  │  ├─6100
    │      │  │  │  ├─6103
    │      │  │  │  ├─6105
    │      │  │  │  ├─6109
    │      │  │  │  ├─6115
    │      │  │  │  ├─6138
    │      │  │  │  ├─6142
    │      │  │  │  ├─6173
    │      │  │  │  ├─6222
    │      │  │  │  ├─6281
    │      │  │  │  ├─6304
    │      │  │  │  ├─6329
    │      │  │  │  ├─6362
    │      │  │  │  ├─6366
    │      │  │  │  ├─6368
    │      │  │  │  │  └─tests
    │      │  │  │  ├─6391
    │      │  │  │  │  ├─src
    │      │  │  │  │  └─tests
    │      │  │  │  ├─6406
    │      │  │  │  ├─6408
    │      │  │  │  ├─6476
    │      │  │  │  ├─6486
    │      │  │  │  ├─74
    │      │  │  │  ├─765
    │      │  │  │  └─797
    │      │  │  ├─testdox
    │      │  │  │  └─_files
    │      │  │  └─_files
    │      │  │      ├─attribute-based-filtering
    │      │  │      │  ├─src
    │      │  │      │  └─tests
    │      │  │      ├─baseline
    │      │  │      │  ├─generate-baseline
    │      │  │      │  │  ├─src
    │      │  │      │  │  └─tests
    │      │  │      │  ├─generate-baseline-suppressed
    │      │  │      │  │  ├─src
    │      │  │      │  │  └─tests
    │      │  │      │  ├─generate-baseline-suppressed-with-ignored-suppression
    │      │  │      │  │  ├─src
    │      │  │      │  │  └─tests
    │      │  │      │  ├─generate-baseline-with-relative-directory
    │      │  │      │  │  └─tests
    │      │  │      │  ├─invalid-baseline
    │      │  │      │  │  └─tests
    │      │  │      │  ├─unsupported-baseline
    │      │  │      │  │  └─tests
    │      │  │      │  ├─use-baseline
    │      │  │      │  │  ├─src
    │      │  │      │  │  └─tests
    │      │  │      │  └─use-baseline-in-another-directory
    │      │  │      │      └─tests
    │      │  │      ├─basic
    │      │  │      │  └─unit
    │      │  │      ├─clone-readonly-php-82
    │      │  │      ├─controlled-garbage-collection
    │      │  │      │  └─tests
    │      │  │      ├─coverage-annotation-based-filter
    │      │  │      │  ├─src
    │      │  │      │  └─tests
    │      │  │      ├─do-not-fail-on
    │      │  │      │  └─tests
    │      │  │      ├─filter-error-handler
    │      │  │      │  ├─src
    │      │  │      │  ├─tests
    │      │  │      │  └─vendor
    │      │  │      ├─force-covers-annotation
    │      │  │      │  └─tests
    │      │  │      ├─groups
    │      │  │      │  └─tests
    │      │  │      ├─listing-tests-and-groups
    │      │  │      ├─log-events-text
    │      │  │      ├─multiple-testsuites
    │      │  │      │  └─tests
    │      │  │      │      ├─end-to-end
    │      │  │      │      └─unit
    │      │  │      ├─no-log-cc-override
    │      │  │      ├─overlapping-testsuite-configuration
    │      │  │      │  └─tests
    │      │  │      ├─phar-extension
    │      │  │      │  ├─tests
    │      │  │      │  └─tools
    │      │  │      │      └─phpunit.d
    │      │  │      ├─phpt-coverage-file-exists
    │      │  │      ├─size-groups
    │      │  │      ├─stop-on-fail-on
    │      │  │      ├─test-directory-does-not-exist
    │      │  │      └─transform-exception-hook-method
    │      │  │          ├─src
    │      │  │          └─tests
    │      │  ├─unit
    │      │  │  ├─Event
    │      │  │  │  ├─Dispatcher
    │      │  │  │  ├─Emitter
    │      │  │  │  ├─Events
    │      │  │  │  │  ├─Application
    │      │  │  │  │  ├─Test
    │      │  │  │  │  │  ├─HookMethod
    │      │  │  │  │  │  ├─Issue
    │      │  │  │  │  │  ├─Lifecycle
    │      │  │  │  │  │  └─Outcome
    │      │  │  │  │  ├─TestDouble
    │      │  │  │  │  ├─TestRunner
    │      │  │  │  │  └─TestSuite
    │      │  │  │  └─Value
    │      │  │  │      ├─Runtime
    │      │  │  │      ├─Telemetry
    │      │  │  │      ├─Test
    │      │  │  │      │  └─TestData
    │      │  │  │      └─TestSuite
    │      │  │  ├─Framework
    │      │  │  │  ├─Assert
    │      │  │  │  ├─Constraint
    │      │  │  │  │  ├─Boolean
    │      │  │  │  │  ├─Cardinality
    │      │  │  │  │  ├─Equality
    │      │  │  │  │  ├─Exception
    │      │  │  │  │  ├─Filesystem
    │      │  │  │  │  ├─Math
    │      │  │  │  │  ├─Object
    │      │  │  │  │  ├─Operator
    │      │  │  │  │  ├─String
    │      │  │  │  │  ├─Traversable
    │      │  │  │  │  └─Type
    │      │  │  │  ├─Exception
    │      │  │  │  ├─MockObject
    │      │  │  │  │  ├─Creation
    │      │  │  │  │  ├─Generator
    │      │  │  │  │  └─Runtime
    │      │  │  │  └─TestRunner
    │      │  │  ├─Logging
    │      │  │  │  └─TestDox
    │      │  │  ├─Metadata
    │      │  │  │  ├─Api
    │      │  │  │  ├─Parser
    │      │  │  │  │  └─Annotation
    │      │  │  │  └─Version
    │      │  │  ├─Runner
    │      │  │  │  ├─Baseline
    │      │  │  │  ├─Filter
    │      │  │  │  ├─HookMethod
    │      │  │  │  └─ResultCache
    │      │  │  ├─TextUI
    │      │  │  │  ├─Command
    │      │  │  │  │  └─Commands
    │      │  │  │  ├─Configuration
    │      │  │  │  │  ├─Cli
    │      │  │  │  │  ├─Value
    │      │  │  │  │  └─Xml
    │      │  │  │  └─Output
    │      │  │  │      └─Default
    │      │  │  │          └─expectations
    │      │  │  └─Util
    │      │  │      ├─PHP
    │      │  │      └─Xml
    │      │  └─_files
    │      │      ├─abstract
    │      │      │  ├─with-test-suffix
    │      │      │  └─without-test-suffix
    │      │      ├─baseline
    │      │      ├─DataProviderIssue2833
    │      │      ├─dependencies
    │      │      ├─deprecation-trigger
    │      │      ├─EnumerationEquals
    │      │      ├─Inheritance
    │      │      ├─JsonData
    │      │      ├─Metadata
    │      │      │  ├─Annotation
    │      │      │  │  ├─src
    │      │      │  │  └─tests
    │      │      │  └─Attribute
    │      │      │      ├─src
    │      │      │      └─tests
    │      │      ├─mock-object
    │      │      ├─namespace
    │      │      │  ├─someNamespaceA
    │      │      │  └─someNamespaceB
    │      │      ├─ObjectEquals
    │      │      ├─OneClassPerFile
    │      │      │  └─wrongClassName
    │      │      ├─SameClassNames
    │      │      │  ├─NamespaceOne
    │      │      │  └─NamespaceTwo
    │      │      ├─source-filter
    │      │      │  ├─a
    │      │      │  │  └─c
    │      │      │  │      ├─.hidden
    │      │      │  │      └─d
    │      │      │  └─b
    │      │      │      ├─e
    │      │      │      │  └─g
    │      │      │      └─f
    │      │      │          └─h
    │      │      └─XmlConfigurationMigration
    │      └─tools
    ├─psr
    │  ├─clock
    │  │  └─src
    │  ├─container
    │  │  └─src
    │  ├─event-dispatcher
    │  │  └─src
    │  ├─http-client
    │  │  └─src
    │  ├─http-factory
    │  │  └─src
    │  ├─http-message
    │  │  ├─docs
    │  │  └─src
    │  ├─log
    │  │  └─src
    │  └─simple-cache
    │      └─src
    ├─psy
    │  └─psysh
    │      ├─.github
    │      │  └─workflows
    │      ├─.phan
    │      ├─bin
    │      ├─build
    │      ├─scripts
    │      ├─src
    │      │  ├─Clipboard
    │      │  ├─CodeAnalysis
    │      │  ├─CodeCleaner
    │      │  ├─Command
    │      │  │  ├─Config
    │      │  │  ├─ListCommand
    │      │  │  └─TimeitCommand
    │      │  ├─Completion
    │      │  │  ├─Refiner
    │      │  │  └─Source
    │      │  ├─Exception
    │      │  ├─ExecutionLoop
    │      │  ├─Formatter
    │      │  ├─Input
    │      │  ├─Logger
    │      │  ├─Manual
    │      │  ├─ManualUpdater
    │      │  ├─Output
    │      │  ├─Readline
    │      │  │  ├─Hoa
    │      │  │  │  └─Terminfo
    │      │  │  │      ├─77
    │      │  │  │      └─78
    │      │  │  └─Interactive
    │      │  │      ├─Actions
    │      │  │      ├─Helper
    │      │  │      ├─Input
    │      │  │      ├─Layout
    │      │  │      ├─Renderer
    │      │  │      └─Suggestion
    │      │  │          └─Source
    │      │  ├─Reflection
    │      │  ├─Shell
    │      │  ├─Sudo
    │      │  ├─TabCompletion
    │      │  │  ├─AutoloadWarmer
    │      │  │  └─Matcher
    │      │  ├─Util
    │      │  ├─VarDumper
    │      │  └─VersionUpdater
    │      │      └─Downloader
    │      ├─test
    │      │  ├─Clipboard
    │      │  ├─CodeAnalysis
    │      │  ├─CodeCleaner
    │      │  ├─Command
    │      │  │  ├─ListCommand
    │      │  │  └─TimeitCommand
    │      │  ├─Completion
    │      │  │  ├─Refiner
    │      │  │  └─Source
    │      │  ├─Configuration
    │      │  ├─Exception
    │      │  ├─ExecutionLoop
    │      │  ├─Fixtures
    │      │  │  ├─autoload-warmer-vendor
    │      │  │  │  └─composer
    │      │  │  ├─CodeCleaner
    │      │  │  ├─Command
    │      │  │  │  └─ListCommand
    │      │  │  ├─Completion
    │      │  │  ├─default
    │      │  │  │  ├─.config
    │      │  │  │  │  └─psysh
    │      │  │  │  └─.local
    │      │  │  │      └─share
    │      │  │  │          └─psysh
    │      │  │  ├─Formatter
    │      │  │  ├─legacy
    │      │  │  │  └─.psysh
    │      │  │  ├─mixed
    │      │  │  │  └─.psysh
    │      │  │  ├─project
    │      │  │  ├─Readline
    │      │  │  ├─TabCompletion
    │      │  │  ├─Util
    │      │  │  ├─which
    │      │  │  │  ├─bin
    │      │  │  │  ├─home
    │      │  │  │  │  └─username
    │      │  │  │  │      └─bin
    │      │  │  │  ├─notexec
    │      │  │  │  ├─sbin
    │      │  │  │  └─usr
    │      │  │  │      ├─bin
    │      │  │  │      └─sbin
    │      │  │  └─xdg
    │      │  │      ├─config
    │      │  │      │  └─psysh
    │      │  │      ├─data
    │      │  │      │  └─psysh
    │      │  │      └─runtime
    │      │  │          └─psysh
    │      │  ├─Formatter
    │      │  ├─Input
    │      │  ├─Logger
    │      │  ├─Manual
    │      │  ├─ManualUpdater
    │      │  ├─Output
    │      │  ├─Readline
    │      │  │  └─Interactive
    │      │  │      ├─Actions
    │      │  │      ├─Helper
    │      │  │      ├─Input
    │      │  │      ├─Layout
    │      │  │      ├─Renderer
    │      │  │      └─Suggestion
    │      │  │          └─Source
    │      │  ├─Reflection
    │      │  ├─Shell
    │      │  ├─Sudo
    │      │  ├─TabCompletion
    │      │  │  ├─AutoloadWarmer
    │      │  │  └─Matcher
    │      │  ├─tools
    │      │  ├─Util
    │      │  ├─VarDumper
    │      │  └─VersionUpdater
    │      └─vendor-bin
    │          ├─box
    │          ├─phan
    │          ├─phpstan
    │          └─phpunit
    ├─ralouphie
    │  └─getallheaders
    │      ├─src
    │      └─tests
    ├─ramsey
    │  ├─collection
    │  │  ├─.github
    │  │  │  ├─ISSUE_TEMPLATE
    │  │  │  └─workflows
    │  │  ├─build
    │  │  │  ├─cache
    │  │  │  └─logs
    │  │  ├─docs
    │  │  ├─src
    │  │  │  ├─Exception
    │  │  │  ├─Map
    │  │  │  └─Tool
    │  │  └─tests
    │  │      ├─Map
    │  │      ├─Mock
    │  │      ├─stubs
    │  │      ├─Tool
    │  │      │  └─Mock
    │  │      └─types
    │  └─uuid
    │      ├─.github
    │      │  ├─ISSUE_TEMPLATE
    │      │  └─workflows
    │      ├─build
    │      │  ├─cache
    │      │  └─logs
    │      ├─docs
    │      │  ├─customize
    │      │  ├─nonstandard
    │      │  ├─reference
    │      │  ├─rfc4122
    │      │  ├─upgrading
    │      │  └─_static
    │      ├─resources
    │      │  └─vagrant
    │      │      ├─freebsd
    │      │      ├─linux
    │      │      └─windows
    │      ├─src
    │      │  ├─Builder
    │      │  ├─Codec
    │      │  ├─Converter
    │      │  │  ├─Number
    │      │  │  └─Time
    │      │  ├─Exception
    │      │  ├─Fields
    │      │  ├─Generator
    │      │  ├─Guid
    │      │  ├─Lazy
    │      │  ├─Math
    │      │  ├─Nonstandard
    │      │  ├─Provider
    │      │  │  ├─Dce
    │      │  │  ├─Node
    │      │  │  └─Time
    │      │  ├─Rfc4122
    │      │  ├─Type
    │      │  └─Validator
    │      └─tests
    │          ├─benchmark
    │          ├─Builder
    │          ├─Codec
    │          ├─Converter
    │          │  ├─Number
    │          │  └─Time
    │          ├─Encoder
    │          ├─Generator
    │          ├─Guid
    │          ├─Math
    │          ├─Nonstandard
    │          ├─Provider
    │          │  ├─Dce
    │          │  ├─Node
    │          │  └─Time
    │          ├─Rfc4122
    │          ├─static-analysis
    │          ├─Type
    │          └─Validator
    ├─sebastian
    │  ├─cli-parser
    │  │  ├─.github
    │  │  │  └─workflows
    │  │  ├─.phive
    │  │  ├─build
    │  │  │  └─scripts
    │  │  ├─src
    │  │  │  └─exceptions
    │  │  ├─tests
    │  │  └─tools
    │  ├─code-unit
    │  │  ├─.github
    │  │  │  └─workflows
    │  │  ├─.phive
    │  │  ├─build
    │  │  │  └─scripts
    │  │  ├─src
    │  │  │  └─exceptions
    │  │  ├─tests
    │  │  │  ├─unit
    │  │  │  └─_fixture
    │  │  └─tools
    │  │      └─.phpstan
    │  │          └─vendor
    │  │              ├─bin
    │  │              ├─composer
    │  │              ├─ergebnis
    │  │              │  └─phpstan-rules
    │  │              │      └─src
    │  │              │          ├─Classes
    │  │              │          │  └─PHPUnit
    │  │              │          │      └─Framework
    │  │              │          ├─Closures
    │  │              │          ├─Expressions
    │  │              │          ├─Files
    │  │              │          ├─Functions
    │  │              │          ├─Methods
    │  │              │          └─Statements
    │  │              ├─nette
    │  │              │  └─utils
    │  │              │      └─src
    │  │              │          ├─Iterators
    │  │              │          └─Utils
    │  │              ├─phpstan
    │  │              │  ├─extension-installer
    │  │              │  │  └─src
    │  │              │  ├─phpstan
    │  │              │  │  └─conf
    │  │              │  └─phpstan-strict-rules
    │  │              │      └─src
    │  │              │          └─Rules
    │  │              │              ├─BooleansInConditions
    │  │              │              ├─Cast
    │  │              │              ├─Classes
    │  │              │              ├─DisallowedConstructs
    │  │              │              ├─ForeachLoop
    │  │              │              ├─ForLoop
    │  │              │              ├─Functions
    │  │              │              ├─Methods
    │  │              │              ├─Operators
    │  │              │              ├─StrictCalls
    │  │              │              ├─SwitchConditions
    │  │              │              └─VariableVariables
    │  │              └─tomasvotruba
    │  │                  └─type-coverage
    │  │                      ├─config
    │  │                      ├─docs
    │  │                      └─src
    │  │                          ├─Collectors
    │  │                          ├─Configuration
    │  │                          ├─Formatter
    │  │                          ├─Rules
    │  │                          └─ValueObject
    │  ├─code-unit-reverse-lookup
    │  │  ├─.github
    │  │  │  └─workflows
    │  │  ├─.phive
    │  │  ├─build
    │  │  │  └─scripts
    │  │  ├─src
    │  │  ├─tests
    │  │  │  └─_fixture
    │  │  └─tools
    │  ├─comparator
    │  │  ├─.github
    │  │  │  └─workflows
    │  │  ├─.phive
    │  │  ├─build
    │  │  │  └─scripts
    │  │  ├─src
    │  │  │  └─exceptions
    │  │  ├─tests
    │  │  │  ├─unit
    │  │  │  └─_fixture
    │  │  └─tools
    │  ├─complexity
    │  │  ├─.github
    │  │  │  └─workflows
    │  │  ├─.phive
    │  │  ├─build
    │  │  │  └─scripts
    │  │  ├─src
    │  │  │  ├─Complexity
    │  │  │  ├─Exception
    │  │  │  └─Visitor
    │  │  ├─tests
    │  │  │  ├─integration
    │  │  │  ├─unit
    │  │  │  └─_fixture
    │  │  └─tools
    │  ├─diff
    │  │  ├─.github
    │  │  │  └─workflows
    │  │  ├─.phive
    │  │  ├─build
    │  │  │  └─scripts
    │  │  ├─src
    │  │  │  ├─Exception
    │  │  │  └─Output
    │  │  ├─tests
    │  │  │  ├─Exception
    │  │  │  ├─fixtures
    │  │  │  │  ├─out
    │  │  │  │  └─UnifiedDiffAssertTraitIntegrationTest
    │  │  │  ├─Output
    │  │  │  │  └─Integration
    │  │  │  └─Utils
    │  │  └─tools
    │  ├─environment
    │  │  ├─.github
    │  │  │  └─workflows
    │  │  ├─.phive
    │  │  ├─build
    │  │  │  └─scripts
    │  │  ├─src
    │  │  ├─tests
    │  │  └─tools
    │  ├─exporter
    │  │  ├─.github
    │  │  │  └─workflows
    │  │  ├─.phive
    │  │  ├─build
    │  │  │  └─scripts
    │  │  ├─src
    │  │  ├─tests
    │  │  │  └─_fixture
    │  │  └─tools
    │  ├─global-state
    │  │  ├─.github
    │  │  │  └─workflows
    │  │  ├─.phive
    │  │  ├─build
    │  │  │  └─scripts
    │  │  ├─src
    │  │  │  └─exceptions
    │  │  ├─tests
    │  │  │  ├─unit
    │  │  │  └─_fixture
    │  │  └─tools
    │  ├─lines-of-code
    │  │  ├─.github
    │  │  │  └─workflows
    │  │  ├─.phive
    │  │  ├─build
    │  │  │  └─scripts
    │  │  ├─src
    │  │  │  └─Exception
    │  │  ├─tests
    │  │  │  ├─integration
    │  │  │  ├─unit
    │  │  │  └─_fixture
    │  │  └─tools
    │  ├─object-enumerator
    │  │  ├─.github
    │  │  │  └─workflows
    │  │  ├─.phive
    │  │  ├─build
    │  │  │  └─scripts
    │  │  ├─src
    │  │  ├─tests
    │  │  │  ├─unit
    │  │  │  └─_fixture
    │  │  └─tools
    │  ├─object-reflector
    │  │  ├─.github
    │  │  │  └─workflows
    │  │  ├─.phive
    │  │  ├─build
    │  │  │  └─scripts
    │  │  ├─src
    │  │  ├─tests
    │  │  │  ├─unit
    │  │  │  └─_fixture
    │  │  └─tools
    │  ├─recursion-context
    │  │  ├─.github
    │  │  │  └─workflows
    │  │  ├─.phive
    │  │  ├─build
    │  │  │  └─scripts
    │  │  ├─src
    │  │  ├─tests
    │  │  └─tools
    │  ├─type
    │  │  ├─.github
    │  │  │  └─workflows
    │  │  ├─.phive
    │  │  ├─build
    │  │  │  └─scripts
    │  │  ├─src
    │  │  │  ├─exception
    │  │  │  └─type
    │  │  ├─tests
    │  │  │  ├─unit
    │  │  │  │  └─type
    │  │  │  └─_fixture
    │  │  └─tools
    │  └─version
    │      ├─.github
    │      │  └─workflows
    │      ├─.phive
    │      ├─build
    │      │  └─scripts
    │      ├─src
    │      └─tools
    ├─staabm
    │  └─side-effects-detector
    │      ├─.github
    │      │  └─workflows
    │      ├─lib
    │      └─tests
    ├─symfony
    │  ├─clock
    │  │  ├─.github
    │  │  │  └─workflows
    │  │  ├─Resources
    │  │  ├─Test
    │  │  └─Tests
    │  ├─console
    │  │  ├─.github
    │  │  │  └─workflows
    │  │  ├─Attribute
    │  │  │  └─Reflection
    │  │  ├─CI
    │  │  ├─Command
    │  │  ├─CommandLoader
    │  │  ├─Completion
    │  │  │  └─Output
    │  │  ├─DataCollector
    │  │  ├─Debug
    │  │  ├─DependencyInjection
    │  │  ├─Descriptor
    │  │  ├─Event
    │  │  ├─EventListener
    │  │  ├─Exception
    │  │  ├─Formatter
    │  │  ├─Helper
    │  │  ├─Input
    │  │  ├─Interaction
    │  │  ├─Logger
    │  │  ├─Messenger
    │  │  ├─Output
    │  │  ├─Question
    │  │  ├─Resources
    │  │  │  └─bin
    │  │  ├─SignalRegistry
    │  │  ├─Style
    │  │  ├─Tester
    │  │  │  └─Constraint
    │  │  └─Tests
    │  │      ├─CI
    │  │      ├─Command
    │  │      ├─CommandLoader
    │  │      ├─Completion
    │  │      │  └─Output
    │  │      ├─DependencyInjection
    │  │      ├─Descriptor
    │  │      ├─EventListener
    │  │      ├─Exception
    │  │      ├─Fixtures
    │  │      │  └─Style
    │  │      │      └─SymfonyStyle
    │  │      │          ├─command
    │  │      │          ├─output
    │  │      │          └─progress
    │  │      ├─Formatter
    │  │      ├─Helper
    │  │      ├─Input
    │  │      ├─Logger
    │  │      ├─Messenger
    │  │      ├─Output
    │  │      ├─phpt
    │  │      │  ├─alarm
    │  │      │  ├─signal
    │  │      │  └─single_application
    │  │      ├─Question
    │  │      ├─SignalRegistry
    │  │      ├─Style
    │  │      └─Tester
    │  │          └─Constraint
    │  ├─css-selector
    │  │  ├─.github
    │  │  │  └─workflows
    │  │  ├─Exception
    │  │  ├─Node
    │  │  ├─Parser
    │  │  │  ├─Handler
    │  │  │  ├─Shortcut
    │  │  │  └─Tokenizer
    │  │  ├─Tests
    │  │  │  ├─Node
    │  │  │  ├─Parser
    │  │  │  │  ├─Handler
    │  │  │  │  └─Shortcut
    │  │  │  └─XPath
    │  │  │      └─Fixtures
    │  │  └─XPath
    │  │      └─Extension
    │  ├─deprecation-contracts
    │  │  └─.github
    │  │      └─workflows
    │  ├─error-handler
    │  │  ├─.github
    │  │  │  └─workflows
    │  │  ├─Command
    │  │  ├─Error
    │  │  ├─ErrorEnhancer
    │  │  ├─ErrorRenderer
    │  │  ├─Exception
    │  │  ├─Internal
    │  │  ├─Resources
    │  │  │  ├─assets
    │  │  │  │  ├─css
    │  │  │  │  ├─images
    │  │  │  │  └─js
    │  │  │  ├─bin
    │  │  │  └─views
    │  │  └─Tests
    │  │      ├─Command
    │  │      ├─ErrorEnhancer
    │  │      ├─ErrorRenderer
    │  │      ├─Exception
    │  │      ├─Fixtures
    │  │      │  ├─FinalConstant
    │  │      │  ├─FinalProperty
    │  │      │  └─psr4
    │  │      ├─Fixtures2
    │  │      └─phpt
    │  ├─event-dispatcher
    │  │  ├─.github
    │  │  │  └─workflows
    │  │  ├─Attribute
    │  │  ├─Debug
    │  │  ├─DependencyInjection
    │  │  └─Tests
    │  │      ├─Debug
    │  │      ├─DependencyInjection
    │  │      └─Fixtures
    │  ├─event-dispatcher-contracts
    │  │  └─.github
    │  │      └─workflows
    │  ├─finder
    │  │  ├─.github
    │  │  │  └─workflows
    │  │  ├─Comparator
    │  │  ├─Exception
    │  │  ├─Iterator
    │  │  └─Tests
    │  │      ├─Comparator
    │  │      ├─Fixtures
    │  │      │  ├─.dot
    │  │      │  │  └─b
    │  │      │  ├─A
    │  │      │  │  └─B
    │  │      │  │      └─C
    │  │      │  ├─copy
    │  │      │  │  └─A
    │  │      │  │      └─B
    │  │      │  │          └─C
    │  │      │  ├─gitignore
    │  │      │  │  ├─git_root
    │  │      │  │  │  └─search_root
    │  │      │  │  │      └─dir
    │  │      │  │  └─search_root
    │  │      │  │      └─dir
    │  │      │  ├─one
    │  │      │  │  └─b
    │  │      │  ├─r+e.gex[c]a(r)s
    │  │      │  │  └─dir
    │  │      │  └─with space
    │  │      └─Iterator
    │  ├─http-foundation
    │  │  ├─.github
    │  │  │  └─workflows
    │  │  ├─Exception
    │  │  ├─File
    │  │  │  └─Exception
    │  │  ├─RateLimiter
    │  │  ├─RequestMatcher
    │  │  ├─Session
    │  │  │  ├─Attribute
    │  │  │  ├─Flash
    │  │  │  └─Storage
    │  │  │      ├─Handler
    │  │  │      └─Proxy
    │  │  ├─Test
    │  │  │  └─Constraint
    │  │  └─Tests
    │  │      ├─File
    │  │      │  └─Fixtures
    │  │      │      ├─directory
    │  │      │      └─webkitdirectory
    │  │      │          └─nested
    │  │      ├─Fixtures
    │  │      │  ├─request-functional
    │  │      │  ├─response-functional
    │  │      │  └─xml
    │  │      ├─RateLimiter
    │  │      ├─RequestMatcher
    │  │      ├─schema
    │  │      ├─Session
    │  │      │  ├─Attribute
    │  │      │  ├─Flash
    │  │      │  └─Storage
    │  │      │      ├─Handler
    │  │      │      │  ├─Fixtures
    │  │      │      │  └─stubs
    │  │      │      └─Proxy
    │  │      └─Test
    │  │          └─Constraint
    │  ├─http-kernel
    │  │  ├─.github
    │  │  │  └─workflows
    │  │  ├─Attribute
    │  │  ├─Bundle
    │  │  ├─CacheClearer
    │  │  ├─CacheWarmer
    │  │  ├─Config
    │  │  ├─Controller
    │  │  │  └─ArgumentResolver
    │  │  ├─ControllerMetadata
    │  │  ├─DataCollector
    │  │  ├─Debug
    │  │  ├─DependencyInjection
    │  │  ├─Event
    │  │  ├─EventListener
    │  │  ├─Exception
    │  │  ├─Fragment
    │  │  ├─HttpCache
    │  │  ├─Log
    │  │  ├─Profiler
    │  │  ├─Resources
    │  │  └─Tests
    │  │      ├─Attribute
    │  │      ├─Bundle
    │  │      ├─CacheClearer
    │  │      ├─CacheWarmer
    │  │      ├─Config
    │  │      ├─Controller
    │  │      │  └─ArgumentResolver
    │  │      ├─ControllerMetadata
    │  │      ├─DataCollector
    │  │      ├─Debug
    │  │      ├─DependencyInjection
    │  │      ├─Event
    │  │      ├─EventListener
    │  │      ├─Exception
    │  │      ├─Fixtures
    │  │      │  ├─AcmeFooBundle
    │  │      │  │  └─Resources
    │  │      │  │      └─config
    │  │      │  ├─Attribute
    │  │      │  ├─Bundle1Bundle
    │  │      │  │  └─Resources
    │  │      │  ├─Controller
    │  │      │  │  └─ArgumentResolver
    │  │      │  │      └─UploadedFile
    │  │      │  ├─DataCollector
    │  │      │  ├─ExtensionNotValidBundle
    │  │      │  │  └─DependencyInjection
    │  │      │  └─ExtensionPresentBundle
    │  │      │      └─DependencyInjection
    │  │      ├─Fragment
    │  │      ├─HttpCache
    │  │      ├─Log
    │  │      └─Profiler
    │  ├─mailer
    │  │  ├─.github
    │  │  │  └─workflows
    │  │  ├─Command
    │  │  ├─DataCollector
    │  │  ├─Event
    │  │  ├─EventListener
    │  │  ├─Exception
    │  │  ├─Header
    │  │  ├─Messenger
    │  │  ├─Test
    │  │  │  └─Constraint
    │  │  ├─Tests
    │  │  │  ├─Command
    │  │  │  ├─EventListener
    │  │  │  ├─Exception
    │  │  │  ├─Fixtures
    │  │  │  └─Transport
    │  │  │      ├─Fixtures
    │  │  │      └─Smtp
    │  │  │          └─Stream
    │  │  └─Transport
    │  │      └─Smtp
    │  │          ├─Auth
    │  │          └─Stream
    │  ├─mime
    │  │  ├─.github
    │  │  │  └─workflows
    │  │  ├─Crypto
    │  │  ├─DependencyInjection
    │  │  ├─Encoder
    │  │  ├─Exception
    │  │  ├─Header
    │  │  ├─HtmlToTextConverter
    │  │  ├─Part
    │  │  │  └─Multipart
    │  │  ├─Resources
    │  │  │  └─bin
    │  │  ├─Test
    │  │  │  └─Constraint
    │  │  └─Tests
    │  │      ├─Crypto
    │  │      ├─DependencyInjection
    │  │      ├─Encoder
    │  │      ├─Fixtures
    │  │      │  ├─mimetypes
    │  │      │  │  └─directory
    │  │      │  ├─samples
    │  │      │  │  └─charsets
    │  │      │  │      ├─iso-2022-jp
    │  │      │  │      ├─iso-8859-1
    │  │      │  │      └─utf-8
    │  │      │  └─web
    │  │      ├─Header
    │  │      ├─HtmlToTextConverter
    │  │      ├─Part
    │  │      │  └─Multipart
    │  │      ├─Test
    │  │      │  └─Constraint
    │  │      └─_data
    │  ├─polyfill-ctype
    │  ├─polyfill-intl-grapheme
    │  ├─polyfill-intl-idn
    │  │  └─Resources
    │  │      └─unidata
    │  ├─polyfill-intl-normalizer
    │  │  └─Resources
    │  │      ├─stubs
    │  │      └─unidata
    │  ├─polyfill-mbstring
    │  │  └─Resources
    │  │      └─unidata
    │  ├─polyfill-php80
    │  │  └─Resources
    │  │      └─stubs
    │  ├─polyfill-php83
    │  │  └─Resources
    │  │      └─stubs
    │  ├─polyfill-php84
    │  │  └─Resources
    │  │      └─stubs
    │  │          └─Pdo
    │  ├─polyfill-php85
    │  │  └─Resources
    │  │      └─stubs
    │  │          └─Filter
    │  ├─polyfill-uuid
    │  ├─process
    │  │  ├─.github
    │  │  │  └─workflows
    │  │  ├─Exception
    │  │  ├─Messenger
    │  │  ├─Pipes
    │  │  └─Tests
    │  │      ├─Fixtures
    │  │      └─Messenger
    │  ├─routing
    │  │  ├─.github
    │  │  │  └─workflows
    │  │  ├─Annotation
    │  │  ├─Attribute
    │  │  ├─DependencyInjection
    │  │  ├─Exception
    │  │  ├─Generator
    │  │  │  └─Dumper
    │  │  ├─Loader
    │  │  │  ├─Configurator
    │  │  │  │  └─Traits
    │  │  │  └─schema
    │  │  │      └─routing
    │  │  ├─Matcher
    │  │  │  └─Dumper
    │  │  ├─Requirement
    │  │  └─Tests
    │  │      ├─Attribute
    │  │      ├─DependencyInjection
    │  │      ├─Fixtures
    │  │      │  ├─alias
    │  │      │  ├─AttributedClasses
    │  │      │  ├─AttributeFixtures
    │  │      │  ├─Attributes
    │  │      │  ├─AttributesFixtures
    │  │      │  ├─controller
    │  │      │  │  └─empty_wildcard
    │  │      │  ├─directory
    │  │      │  │  └─recurse
    │  │      │  ├─directory_import
    │  │      │  ├─dumper
    │  │      │  ├─Enum
    │  │      │  ├─glob
    │  │      │  ├─import_with_name_prefix
    │  │      │  ├─import_with_no_trailing_slash
    │  │      │  ├─locale_and_host
    │  │      │  ├─localized
    │  │      │  ├─OtherAnnotatedClasses
    │  │      │  ├─psr4-controllers-redirection
    │  │      │  └─Psr4Controllers
    │  │      │      └─SubNamespace
    │  │      │          └─EvenDeeperNamespace
    │  │      ├─Generator
    │  │      │  └─Dumper
    │  │      ├─Loader
    │  │      │  └─Configurator
    │  │      │      └─Traits
    │  │      ├─Matcher
    │  │      │  └─Dumper
    │  │      └─Requirement
    │  ├─service-contracts
    │  │  ├─.github
    │  │  │  └─workflows
    │  │  ├─Attribute
    │  │  └─Test
    │  ├─string
    │  │  ├─.github
    │  │  │  └─workflows
    │  │  ├─Exception
    │  │  ├─Inflector
    │  │  ├─Resources
    │  │  │  ├─bin
    │  │  │  └─data
    │  │  ├─Slugger
    │  │  └─Tests
    │  │      ├─Inflector
    │  │      └─Slugger
    │  ├─translation
    │  │  ├─.github
    │  │  │  └─workflows
    │  │  ├─Catalogue
    │  │  ├─Command
    │  │  ├─DataCollector
    │  │  ├─DependencyInjection
    │  │  ├─Dumper
    │  │  ├─Exception
    │  │  ├─Extractor
    │  │  │  └─Visitor
    │  │  ├─Formatter
    │  │  ├─Loader
    │  │  ├─Provider
    │  │  ├─Reader
    │  │  ├─Resources
    │  │  │  ├─bin
    │  │  │  ├─data
    │  │  │  └─schemas
    │  │  ├─Test
    │  │  ├─Tests
    │  │  │  ├─Catalogue
    │  │  │  ├─Command
    │  │  │  ├─DataCollector
    │  │  │  ├─DependencyInjection
    │  │  │  │  └─Fixtures
    │  │  │  ├─Dumper
    │  │  │  ├─Exception
    │  │  │  ├─Extractor
    │  │  │  ├─Fixtures
    │  │  │  │  ├─extractor
    │  │  │  │  ├─extractor-7.3
    │  │  │  │  ├─extractor-ast
    │  │  │  │  └─resourcebundle
    │  │  │  │      ├─corrupted
    │  │  │  │      ├─dat
    │  │  │  │      └─res
    │  │  │  ├─Formatter
    │  │  │  ├─Loader
    │  │  │  ├─Provider
    │  │  │  ├─Util
    │  │  │  └─Writer
    │  │  ├─Util
    │  │  └─Writer
    │  ├─translation-contracts
    │  │  ├─.github
    │  │  │  └─workflows
    │  │  └─Test
    │  ├─uid
    │  │  ├─.github
    │  │  │  └─workflows
    │  │  ├─Command
    │  │  ├─Exception
    │  │  ├─Factory
    │  │  └─Tests
    │  │      ├─Command
    │  │      ├─Factory
    │  │      └─Fixtures
    │  ├─var-dumper
    │  │  ├─.github
    │  │  │  └─workflows
    │  │  ├─Caster
    │  │  ├─Cloner
    │  │  ├─Command
    │  │  │  └─Descriptor
    │  │  ├─Dumper
    │  │  │  └─ContextProvider
    │  │  ├─Exception
    │  │  ├─Resources
    │  │  │  ├─bin
    │  │  │  ├─css
    │  │  │  ├─functions
    │  │  │  └─js
    │  │  ├─Server
    │  │  ├─Test
    │  │  └─Tests
    │  │      ├─Caster
    │  │      ├─Cloner
    │  │      ├─Command
    │  │      │  └─Descriptor
    │  │      ├─Dumper
    │  │      │  ├─ContextProvider
    │  │      │  └─functions
    │  │      ├─Fixtures
    │  │      ├─Server
    │  │      └─Test
    │  └─yaml
    │      ├─.github
    │      │  └─workflows
    │      ├─Command
    │      ├─Exception
    │      ├─Resources
    │      │  └─bin
    │      ├─Tag
    │      └─Tests
    │          ├─Command
    │          └─Fixtures
    ├─theseer
    │  └─tokenizer
    │      ├─.github
    │      │  └─workflows
    │      ├─src
    │      └─tests
    │          └─_files
    ├─tijsverkoyen
    │  └─css-to-inline-styles
    │      ├─.github
    │      │  └─workflows
    │      ├─example
    │      │  └─examples
    │      │      └─sumo
    │      ├─src
    │      │  └─Css
    │      │      ├─Property
    │      │      └─Rule
    │      └─tests
    │          └─Css
    │              ├─Property
    │              └─Rule
    ├─vlucas
    │  └─phpdotenv
    │      ├─.github
    │      │  └─workflows
    │      ├─src
    │      │  ├─Exception
    │      │  ├─Loader
    │      │  ├─Parser
    │      │  ├─Repository
    │      │  │  └─Adapter
    │      │  ├─Store
    │      │  │  └─File
    │      │  └─Util
    │      ├─tests
    │      │  ├─Dotenv
    │      │  │  ├─Loader
    │      │  │  ├─Parser
    │      │  │  ├─Repository
    │      │  │  │  └─Adapter
    │      │  │  └─Store
    │      │  └─fixtures
    │      │      └─env
    │      └─vendor-bin
    │          └─phpstan
    └─voku
        └─portable-ascii
            ├─.github
            │  └─workflows
            ├─build
            │  └─docs
            ├─src
            │  └─voku
            │      └─helper
            │          └─data
            └─tests
                └─fixtures