realtime-call-app/
│
├── 📁 src/
│   ├── 📁 app/
│   │   ├── 📁 core/                      # Singleton services, guards, interceptors, env configs
│   │   │   ├── services/
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── socket.service.ts
│   │   │   │   └── webrtc.service.ts
│   │   │   ├── guards/
│   │   │   │   └── auth.guard.ts
│   │   │   ├── interceptors/
│   │   │   │   └── auth.interceptor.ts
│   │   │   ├── models/                  # Global interfaces & enums
│   │   │   │   ├── user.model.ts
│   │   │   │   └── call.model.ts
│   │   │   └── core.module.ts
│   │
│   │   ├── 📁 shared/                    # Reusable UI components, pipes, and directives
│   │   │   ├── components/
│   │   │   │   ├── video-tile/
│   │   │   │   └── user-avatar/
│   │   │   ├── pipes/
│   │   │   │   └── duration.pipe.ts
│   │   │   ├── directives/
│   │   │   │   └── autofocus.directive.ts
│   │   │   └── shared.module.ts
│   │
│   │   ├── 📁 features/                  # Feature modules
│   │   │   ├── 📁 auth/                  # Login/Register/OTP/etc.
│   │   │   │   ├── login/
│   │   │   │   ├── register/
│   │   │   │   ├── services/
│   │   │   │   └── auth.module.ts
│   │   │   ├── 📁 dashboard/            # Home dashboard after login
│   │   │   │   └── dashboard.module.ts
│   │   │   ├── 📁 call/                 # Main calling logic
│   │   │   │   ├── group-call/
│   │   │   │   ├── single-call/
│   │   │   │   ├── call-controls/
│   │   │   │   ├── services/
│   │   │   │   └── call.module.ts
│   │   │   └── 📁 settings/             # Theme, profile, notifications, etc.
│   │   │       └── settings.module.ts
│   │
│   │   ├── 📁 layout/                   # UI layout components
│   │   │   ├── header/
│   │   │   ├── sidebar/
│   │   │   ├── theme-switcher/
│   │   │   └── layout.module.ts
│   │
│   │   ├── app-routing.module.ts
│   │   └── app.component.ts
│   │   └── app.module.ts
│
├── 📁 assets/
│   ├── i18n/                            # Translations
│   ├── icons/
│   ├── images/
│   └── styles/
│       ├── themes/                     # Light/Dark themes
│       └── global.scss
│
├── 📁 environments/
│   ├── environment.ts
│   └── environment.prod.ts
│
├── angular.json
├── tsconfig.json
├── package.json
└── README.md
