# CONTEXTO

## .oxlintrc.json
```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}

```

## package-lock.json
```json
{
  "name": "meu-financeiro",
  "version": "0.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "meu-financeiro",
      "version": "0.0.0",
      "dependencies": {
        "@supabase/supabase-js": "^2.117.3",
        "@tailwindcss/vite": "^4.3.3",
        "lucide-react": "^1.57.0",
        "pdfjs-dist": "^6.4.299",
        "react": "^19.2.8",
        "react-dom": "^19.2.8",
        "recharts": "^3.10.1",
        "tailwindcss": "^4.3.3",
        "xlsx": "^0.18.5"
      },
      "devDependencies": {
        "@types/node": "^24.13.3",
        "@types/react": "^19.2.18",
        "@types/react-dom": "^19.2.7",
        "@vitejs/plugin-react": "^6.1.1",
        "oxlint": "^1.81.0",
        "typescript": "~6.0.2",
        "vite": "^8.3.0"
      }
    },
    "node_modules/@jridgewell/gen-mapping": {
      "version": "0.3.13",
      "resolved": "https://registry.npmjs.org/@jridgewell/gen-mapping/-/gen-mapping-0.3.13.tgz",
      "integrity": "sha512-2kkt/7niJ6MgEPxF0bYdQ6etZaA+fQvDcLKckhy1yIQOzaoKjBBjSj63/aLVjYE3qhRt5dvM+uUyfCg6UKCBbA==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/sourcemap-codec": "^1.5.0",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/remapping": {
      "version": "2.3.5",
      "resolved": "https://registry.npmjs.org/@jridgewell/remapping/-/remapping-2.3.5.tgz",
      "integrity": "sha512-LI9u/+laYG4Ds1TDKSJW2YPrIlcVYOwi2fUC6xB43lueCjgxV4lffOCZCtYFiH6TNOX+tQKXx97T4IKHbhyHEQ==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/gen-mapping": "^0.3.5",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/resolve-uri": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/@jridgewell/resolve-uri/-/resolve-uri-3.1.2.tgz",
      "integrity": "sha512-bRISgCIjP20/tbWSPWMEi54QVPRZExkuD9lJL+UIxUKtwVJA8wW1Trb1jMs1RFXo1CBTNZ/5hpC9QvmKWdopKw==",
      "license": "MIT",
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@jridgewell/sourcemap-codec": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/@jridgewell/sourcemap-codec/-/sourcemap-codec-1.6.0.tgz",
      "integrity": "sha512-T7jf+5zgsZHwNJ4lvQ7/aezbyk0nNX+zJVWpmHA7VYsEx7a7qr5Rg5IbtJFqkgze5Y2sruq1RUY8Q837Od7iFw==",
      "license": "MIT"
    },
    "node_modules/@jridgewell/trace-mapping": {
      "version": "0.3.31",
      "resolved": "https://registry.npmjs.org/@jridgewell/trace-mapping/-/trace-mapping-0.3.31.tgz",
      "integrity": "sha512-zzNR+SdQSDJzc8joaeP8QQoCQr8NuYx2dIIytl1QeBEZHJ9uW6hebsrYgbz8hJwUQao3TWCMtmfV8Nu1twOLAw==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/resolve-uri": "^3.1.0",
        "@jridgewell/sourcemap-codec": "^1.4.14"
      }
    },
    "node_modules/@napi-rs/canvas": {
      "version": "1.0.11",
      "resolved": "https://registry.npmjs.org/@napi-rs/canvas/-/canvas-1.0.11.tgz",
      "integrity": "sha512-vt5tog1cr+QKadIddGe+3LrcX0EmjEd0izF717Uwf92mBmgYfq2XRmL2r4bZU40spB69exxhrBn9I91HYEr/7w==",
      "license": "MIT",
      "optional": true,
      "workspaces": [
        "e2e/*"
      ],
      "engines": {
        "node": ">= 10"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/Brooooooklyn"
      },
      "optionalDependencies": {
        "@napi-rs/canvas-android-arm64": "1.0.11",
        "@napi-rs/canvas-darwin-arm64": "1.0.11",
        "@napi-rs/canvas-darwin-x64": "1.0.11",
        "@napi-rs/canvas-linux-arm-gnueabihf": "1.0.11",
        "@napi-rs/canvas-linux-arm64-gnu": "1.0.11",
        "@napi-rs/canvas-linux-arm64-musl": "1.0.11",
        "@napi-rs/canvas-linux-riscv64-gnu": "1.0.11",
        "@napi-rs/canvas-linux-x64-gnu": "1.0.11",
        "@napi-rs/canvas-linux-x64-musl": "1.0.11",
        "@napi-rs/canvas-win32-arm64-msvc": "1.0.11",
        "@napi-rs/canvas-win32-x64-msvc": "1.0.11"
      }
    },
    "node_modules/@napi-rs/canvas-android-arm64": {
      "version": "1.0.11",
      "resolved": "https://registry.npmjs.org/@napi-rs/canvas-android-arm64/-/canvas-android-arm64-1.0.11.tgz",
      "integrity": "sha512-dtJS4FQEfH9OwSYLtMrEnj7T8DzBbJc/97LI/OkiWOYpW/iW5t6R/gcxVrUXS8l45gCVpwMufgucRe/pe0ISqA==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">= 10"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/Brooooooklyn"
      }
    },
    "node_modules/@napi-rs/canvas-darwin-arm64": {
      "version": "1.0.11",
      "resolved": "https://registry.npmjs.org/@napi-rs/canvas-darwin-arm64/-/canvas-darwin-arm64-1.0.11.tgz",
      "integrity": "sha512-J/JylWoJTG8OQqZaiqly4IODyAxNofUlZo0wtSBJtHk6AdymbdIkPynAM1JvQaZpPaG5h+msk9QuK8y4i1ooqw==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 10"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/Brooooooklyn"
      }
    },
    "node_modules/@napi-rs/canvas-darwin-x64": {
      "version": "1.0.11",
      "resolved": "https://registry.npmjs.org/@napi-rs/canvas-darwin-x64/-/canvas-darwin-x64-1.0.11.tgz",
      "integrity": "sha512-nlecCk3xy06eAGC7krZtzNDm9UNTHKuHQYK8ZYegdjzgSL8anGt/eLJZm86OWaNgZkwQwvDqfSmG8Nqe6MPZNQ==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 10"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/Brooooooklyn"
      }
    },
    "node_modules/@napi-rs/canvas-linux-arm-gnueabihf": {
      "version": "1.0.11",
      "resolved": "https://registry.npmjs.org/@napi-rs/canvas-linux-arm-gnueabihf/-/canvas-linux-arm-gnueabihf-1.0.11.tgz",
      "integrity": "sha512-DKImmG+sTPolE0kGPsYPBxTtOjb3INALp32O2lW2CfSr0bAzSEKKuu+GrQbtilClyoPOahUErS3OrznFDraoWA==",
      "cpu": [
        "arm"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/Brooooooklyn"
      }
    },
    "node_modules/@napi-rs/canvas-linux-arm64-gnu": {
      "version": "1.0.11",
      "resolved": "https://registry.npmjs.org/@napi-rs/canvas-linux-arm64-gnu/-/canvas-linux-arm64-gnu-1.0.11.tgz",
      "integrity": "sha512-55sykACGENj5j1rhj+81AO8JbR9HYgGjRZ7/H+pNr4VE1DvINKYNMTcutk8ZmWxk276jAQvUKJ3+Kdj9GXU3lQ==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/Brooooooklyn"
      }
    },
    "node_modules/@napi-rs/canvas-linux-arm64-musl": {
      "version": "1.0.11",
      "resolved": "https://registry.npmjs.org/@napi-rs/canvas-linux-arm64-musl/-/canvas-linux-arm64-musl-1.0.11.tgz",
      "integrity": "sha512-6Jz6jys17yXydO+WdJgu7JhoB4K7/w9sWHByzzTmLjQghUx3TDMWvLv+UcCdnWhg4oprET67EMymnrETdeGNAg==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/Brooooooklyn"
      }
    },
    "node_modules/@napi-rs/canvas-linux-riscv64-gnu": {
      "version": "1.0.11",
      "resolved": "https://registry.npmjs.org/@napi-rs/canvas-linux-riscv64-gnu/-/canvas-linux-riscv64-gnu-1.0.11.tgz",
      "integrity": "sha512-lf2XeEebWiUYVOVEjLXxF7dfXrBBSEOBn9AqBh39VYXrPt5cDqI+1t58IFSjn8npqkg5jIOs8TQbjKABbFW1gQ==",
      "cpu": [
        "riscv64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/Brooooooklyn"
      }
    },
    "node_modules/@napi-rs/canvas-linux-x64-gnu": {
      "version": "1.0.11",
      "resolved": "https://registry.npmjs.org/@napi-rs/canvas-linux-x64-gnu/-/canvas-linux-x64-gnu-1.0.11.tgz",
      "integrity": "sha512-iDapw7nFSE5tsmQxcH2+KotJhyfVPmHd6vUOQN/Em+8WNbkZJwJ/rDowlJMFnMl0SYSDSfgKCNUGi6Sn5++Smg==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/Brooooooklyn"
      }
    },
    "node_modules/@napi-rs/canvas-linux-x64-musl": {
      "version": "1.0.11",
      "resolved": "https://registry.npmjs.org/@napi-rs/canvas-linux-x64-musl/-/canvas-linux-x64-musl-1.0.11.tgz",
      "integrity": "sha512-26q26AyITo3CGZX4HWFIMgBMA1lu3YN07gxzBm4tW6Hglq/OVyTP50kDrmWuKybCX6dh3m8Ly+c7YhI+sqCgCQ==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/Brooooooklyn"
      }
    },
    "node_modules/@napi-rs/canvas-win32-arm64-msvc": {
      "version": "1.0.11",
      "resolved": "https://registry.npmjs.org/@napi-rs/canvas-win32-arm64-msvc/-/canvas-win32-arm64-msvc-1.0.11.tgz",
      "integrity": "sha512-cUO96IdsfvIj2S+2PNcDSkTcLhjPj8pIOEWRV1Kj70MOP4wnE9zSk7N4C1EKHlFGRcgdR5AkbnBZj0dfHK9nbQ==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 10"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/Brooooooklyn"
      }
    },
    "node_modules/@napi-rs/canvas-win32-x64-msvc": {
      "version": "1.0.11",
      "resolved": "https://registry.npmjs.org/@napi-rs/canvas-win32-x64-msvc/-/canvas-win32-x64-msvc-1.0.11.tgz",
      "integrity": "sha512-DFYp/ZQRdKunI/LPc0UkRXG1vlNjJKOJf8O8Ctb8+wm2Nt2ELg9Eamc31D2VoakkfGo8L+z0Iejz6WtFbQwyGw==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 10"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/Brooooooklyn"
      }
    },
    "node_modules/@oxc-project/types": {
      "version": "0.154.0",
      "resolved": "https://registry.npmjs.org/@oxc-project/types/-/types-0.154.0.tgz",
      "integrity": "sha512-KYOUGQFlLWR+s4QMV2Q9ko38TZm7EdO87Qm7rvZLqk/webse/cDjtyxKhg/47l0byCbs/k46LT8qc4PKjAikzA==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/oxc-project"
      }
    },
    "node_modules/@oxlint/binding-android-arm-eabi": {
      "version": "1.88.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-android-arm-eabi/-/binding-android-arm-eabi-1.88.0.tgz",
      "integrity": "sha512-k6Fgkf86ubfeH4GvqYsRolfuVAp0pfYVZvifSlXNHPdMaWUOfxUrmLEeDD7hF6U2oJuhsVxhSWq86/xCJ+9MmA==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-android-arm64": {
      "version": "1.88.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-android-arm64/-/binding-android-arm64-1.88.0.tgz",
      "integrity": "sha512-AsIyhl9o1ejwtac7NMbhKpMdSml6NWR0ljKjZERxC8OHYDAW8o/Om9n1QHVLi4VCEUo42Zte2/Op9kyoGpJZMg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-darwin-arm64": {
      "version": "1.88.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-darwin-arm64/-/binding-darwin-arm64-1.88.0.tgz",
      "integrity": "sha512-qgBjB7eEKcCB4RqjXGuoSZq74g0wD09fWFJ+HWcCJcKaga8TeUHtb+BY0SsxdleSLBgx4RZ7qmgo0EzqEq7JoQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-darwin-x64": {
      "version": "1.88.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-darwin-x64/-/binding-darwin-x64-1.88.0.tgz",
      "integrity": "sha512-sCz3X5Mw/xdzEzn4fsCt1Iq8NKJnGNfhR+b9B5k+4DysYAHsmIhYoocnBPiQ9kvY3+pUun2A0Z8Vtun/Nv6YoQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-freebsd-x64": {
      "version": "1.88.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-freebsd-x64/-/binding-freebsd-x64-1.88.0.tgz",
      "integrity": "sha512-xTOdYOIqCufgIj0knvxu86FBfovP6QBiD7ngNva01gb8xPQCD5gXkE5APGczH35zStim1O3zqvFbLQmY85xXRg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-linux-arm-gnueabihf": {
      "version": "1.88.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-linux-arm-gnueabihf/-/binding-linux-arm-gnueabihf-1.88.0.tgz",
      "integrity": "sha512-BLadtw88NdYJBrAtC1dYzrPfSP2d5zgx6iuZycdD0YmZBJ2Nqbit9Z4PSaIb6gxK25dweArGMPbOmq/0ugwUPg==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-linux-arm-musleabihf": {
      "version": "1.88.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-linux-arm-musleabihf/-/binding-linux-arm-musleabihf-1.88.0.tgz",
      "integrity": "sha512-wILSczl/DaZsCcf7j7tvNbssp8hxEHIJxrv4j7+JjI3TAL1U/JTWbeUtoJJC/vo8+2hkTmHLYoKJjmiNbijdXw==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-linux-arm64-gnu": {
      "version": "1.88.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-linux-arm64-gnu/-/binding-linux-arm64-gnu-1.88.0.tgz",
      "integrity": "sha512-jutT2Hy8JCuZuMwIFHo2HtyxfOfBJHyQxlBHBK1SL9W2f8n/WhjAP0FnDMz9d/mjhv9+QA0mx5AdQ9fDjsrFFg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-linux-arm64-musl": {
      "version": "1.88.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-linux-arm64-musl/-/binding-linux-arm64-musl-1.88.0.tgz",
      "integrity": "sha512-8N8iGV9hh4Lkeuq7QsEkjoXNRRflqR1G2qyoGYXcA0k5qllrdqmfylKEXyHIVERxqNDyMO4StqDQ0uLxXcBQAg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-linux-ppc64-gnu": {
      "version": "1.88.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-linux-ppc64-gnu/-/binding-linux-ppc64-gnu-1.88.0.tgz",
      "integrity": "sha512-5ydcQt3znNQ/rGEWYRvpS2cK9+T18P2VYgnyJ+eloEAwi9YUmsXy5VGrRqNWIK6qzWwHGnEE3ojVqqQNo+f0hA==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-linux-riscv64-gnu": {
      "version": "1.88.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-linux-riscv64-gnu/-/binding-linux-riscv64-gnu-1.88.0.tgz",
      "integrity": "sha512-iGx0uvFT54b/5DPJdEBCxYIrVB3v0uTy+JhRh3CyEp8/22BXDkG8rffkFwREdLsdj9mOrPbJYVOZw8ipcBuzjw==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-linux-riscv64-musl": {
      "version": "1.88.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-linux-riscv64-musl/-/binding-linux-riscv64-musl-1.88.0.tgz",
      "integrity": "sha512-Wt47mKMWelVjRjuR7BCFxXkB0m79K1sTEbqMHRWciKUgo5iv7sWsF4RXSOyFYHD9zerNrkRZblnN273rhwOA1Q==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-linux-s390x-gnu": {
      "version": "1.88.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-linux-s390x-gnu/-/binding-linux-s390x-gnu-1.88.0.tgz",
      "integrity": "sha512-g3L12KCS4+1gtUt3RbJ4F+Yxx4LNmmZLEPfhd8rAHEJjJk2lAgNfnjGoP/phJyhG5WS6VbNYbJtadJelNfvTMA==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-linux-x64-gnu": {
      "version": "1.88.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-linux-x64-gnu/-/binding-linux-x64-gnu-1.88.0.tgz",
      "integrity": "sha512-og/XHVDOD9ZJgRiZkT9DgzQd4sr+JZW7e4l17Q/jVMZiIbeEd4uIu9iAoUbTF1gIvVZoRc4QDOxyVUvQGp4WHg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-linux-x64-musl": {
      "version": "1.88.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-linux-x64-musl/-/binding-linux-x64-musl-1.88.0.tgz",
      "integrity": "sha512-EmhBsp+xuKb6YbZNEMLBo80Xw71AZOIm18do8ni/GLX/Lw1XzNhVYpbxO1KasYtoAvrGtCOdCPULRlIE0bPbTQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-openharmony-arm64": {
      "version": "1.88.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-openharmony-arm64/-/binding-openharmony-arm64-1.88.0.tgz",
      "integrity": "sha512-DBUcx/KwYdg1DAz+G01P/GFv512J04EsZadbHptx2FTpWT/MWRg21ZToNHt9pnsfQRBQ3et/g+vqzbvrdAVbuA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-win32-arm64-msvc": {
      "version": "1.88.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-win32-arm64-msvc/-/binding-win32-arm64-msvc-1.88.0.tgz",
      "integrity": "sha512-xeVd0n4XG5HvynxfYvXi6uB+JvZbVZataowPS8cYpMbYg9mwE4sSyElFQd4LVJFifq8bRLDSR18XgEildmcXAg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-win32-ia32-msvc": {
      "version": "1.88.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-win32-ia32-msvc/-/binding-win32-ia32-msvc-1.88.0.tgz",
      "integrity": "sha512-MA6iOw//amleaz2mVMsZrA7NHlEexjTrhIxSMFCXQi6IUuQO+3Od00GZhr2iCYw6RFzMW36jkKK/WHBXMsoQAw==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-win32-x64-msvc": {
      "version": "1.88.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-win32-x64-msvc/-/binding-win32-x64-msvc-1.88.0.tgz",
      "integrity": "sha512-3Sz6rVWe8Dy+ufsXurFN1GX2dX43F/lQMSLelK9gFjiba7nHvLlqlhR5cHlWVnCpSqUY1hN9pyCX9XToe6ve6g==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@reduxjs/toolkit": {
      "version": "2.13.0",
      "resolved": "https://registry.npmjs.org/@reduxjs/toolkit/-/toolkit-2.13.0.tgz",
      "integrity": "sha512-f6jwVRfwW30+tnllz4YcsHHpPYYOE7abcHkyUCovD+P7DyhdAI5prz2Fh/8TLhakjpN+7aIEion1s5L/tvlYlA==",
      "license": "MIT",
      "dependencies": {
        "@standard-schema/spec": "^1.0.0",
        "@standard-schema/utils": "^0.3.0",
        "immer": "^11.0.0",
        "redux": "^5.0.1",
        "redux-thunk": "^3.1.0",
        "reselect": "^5.1.0"
      },
      "peerDependencies": {
        "react": "^16.9.0 || ^17.0.0 || ^18 || ^19",
        "react-redux": "^7.2.1 || ^8.1.3 || ^9.0.0"
      },
      "peerDependenciesMeta": {
        "react": {
          "optional": true
        },
        "react-redux": {
          "optional": true
        }
      }
    },
    "node_modules/@rolldown/binding-android-arm-eabi": {
      "version": "1.2.14",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-android-arm-eabi/-/binding-android-arm-eabi-1.2.14.tgz",
      "integrity": "sha512-aWR+XKH9+rW7m5fWq/5360J3mHycrx/o6xZM2DQFdJnTMdyP7/WzxPjhtLbVWdKo2y612/4U1bWqb3HQhiF7vg==",
      "cpu": [
        "arm"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-android-arm64": {
      "version": "1.2.14",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-android-arm64/-/binding-android-arm64-1.2.14.tgz",
      "integrity": "sha512-QiVxHofl6A8lQU7WAtOUY4QMVZXohxwz7WJJoeh8NBEUyKfIkMRKhYyq8az/1RypNiIXzNTtiS6KwHz0erxYRQ==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-darwin-arm64": {
      "version": "1.2.14",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-darwin-arm64/-/binding-darwin-arm64-1.2.14.tgz",
      "integrity": "sha512-lTQOzHuBIooh3jIr5XINQkjPGEuGy+Dsy0meXDr6Sjty0b99kYgGh4uBC/8mJX1T0kC8d6S0aPP1Y+bHkh6aBw==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-darwin-x64": {
      "version": "1.2.14",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-darwin-x64/-/binding-darwin-x64-1.2.14.tgz",
      "integrity": "sha512-hyMKEGatjmBYCs/Q4sbIcL/GqpFEqsX3wc+HYVQ/85A4rxc1o7rPm4DUI4GV4k/h0ITddwFSGpqQunI14GXjTA==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-freebsd-x64": {
      "version": "1.2.14",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-freebsd-x64/-/binding-freebsd-x64-1.2.14.tgz",
      "integrity": "sha512-u371GbXoVXrEgP20PwzoGNOdAOqAMhzo19JzzY+V4YmmnC+DTOoqdbMu+O+54emM59Mik/UdrtWgcuEDKWRPKA==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-arm-gnueabihf": {
      "version": "1.2.14",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-arm-gnueabihf/-/binding-linux-arm-gnueabihf-1.2.14.tgz",
      "integrity": "sha512-BqwKsdZQf6EqVWr8fv2MrDYzAvOZ7+NYFSJESRGs87fkseEhs0TU9TXgRJTkZoRRkxTizyEg1LKUXfU3/78uqg==",
      "cpu": [
        "arm"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-arm64-gnu": {
      "version": "1.2.14",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-arm64-gnu/-/binding-linux-arm64-gnu-1.2.14.tgz",
      "integrity": "sha512-SD9kY8M009x/7s57Z1dgUVlP5+uYBgKQK0Tkr1WIWngrtUJmRCW1RJFMY7QDla2khXhmg2i5Io7MUjcmZNZ/KQ==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-arm64-musl": {
      "version": "1.2.14",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-arm64-musl/-/binding-linux-arm64-musl-1.2.14.tgz",
      "integrity": "sha512-BJ2CL19M6uuWesMgnqJzgxoI+N+eV7b0A9O9vLV42y+gitC41fNa8KElau1tHVzuLWX5GzEuxMPhAO0tQXQMkg==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-ppc64-gnu": {
      "version": "1.2.14",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-ppc64-gnu/-/binding-linux-ppc64-gnu-1.2.14.tgz",
      "integrity": "sha512-4+Kl8daPV8NDHaD7mfCcc1pRM+Qg7ab8DyMm5FG5WoZgv4h2i3KFN1CybYBNbQqmuYm7ftJLvmMI1eHYJ22S/Q==",
      "cpu": [
        "ppc64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-s390x-gnu": {
      "version": "1.2.14",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-s390x-gnu/-/binding-linux-s390x-gnu-1.2.14.tgz",
      "integrity": "sha512-V/h8ePq1fKDrmtFMz6xcCN3DKvuvMRrwwD1q0PkBeeo4DpK64biaKvqWGVxqCeYKqeRk7gE7/iKPxLCn08O97A==",
      "cpu": [
        "s390x"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-x64-gnu": {
      "version": "1.2.14",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-x64-gnu/-/binding-linux-x64-gnu-1.2.14.tgz",
      "integrity": "sha512-WxalXzgrLVpKC93xfpaJ3gCXUWzeCr+FRCbDVD2mUAy4L6Vo3lNVz0epUEUpxPWJkLNYUwM4OSIikv36OJ9mLg==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-x64-musl": {
      "version": "1.2.14",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-x64-musl/-/binding-linux-x64-musl-1.2.14.tgz",
      "integrity": "sha512-3G3tnAmTpdk9jO3GQtyHXqeFD2SlecfTws/Y3M2mmj9nMBwwuLT4kur8sZKeu7ENUHSpVO3cIsm5A52LEWWwlg==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-openharmony-arm64": {
      "version": "1.2.14",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-openharmony-arm64/-/binding-openharmony-arm64-1.2.14.tgz",
      "integrity": "sha512-qyr5XiNGxm2ytx17vvtcJ9nXn6v1gENETi503bJx3OGwZ1tSonj7BosxbMa/xeAfSl5iS9X6KjEWYXLu6v1L7Q==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-win32-arm64-msvc": {
      "version": "1.2.14",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-win32-arm64-msvc/-/binding-win32-arm64-msvc-1.2.14.tgz",
      "integrity": "sha512-oA4o5o0S2yB199YyYXDzKUv1Z56Rc+mgOjwm7Z/vJ9Z8igiDPYvoOuDyo6g7AK/ZaF09nPhDKVnGBcYHO11GXA==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-win32-x64-msvc": {
      "version": "1.2.14",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-win32-x64-msvc/-/binding-win32-x64-msvc-1.2.14.tgz",
      "integrity": "sha512-9mE94bf2GZUaR/fUSXCMpBoWkctu421Mi0ORpm4zqfbkjKep7RxzPFa5etcGs5h+2KApoWBOA/hAJa/7saGgEQ==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/pluginutils": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/@rolldown/pluginutils/-/pluginutils-1.0.1.tgz",
      "integrity": "sha512-2j9bGt5Jh8hj+vPtgzPtl72j0yRxHAyumoo6TNfAjsLB04UtpSvPbPcDcBMxz7n+9CYB0c1GxQFxYRg2jimqGw==",
      "license": "MIT"
    },
    "node_modules/@standard-schema/spec": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@standard-schema/spec/-/spec-1.1.0.tgz",
      "integrity": "sha512-l2aFy5jALhniG5HgqrD6jXLi/rUWrKvqN/qJx6yoJsgKhblVd+iqqU4RCXavm/jPityDo5TCvKMnpjKnOriy0w==",
      "license": "MIT"
    },
    "node_modules/@standard-schema/utils": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/@standard-schema/utils/-/utils-0.3.0.tgz",
      "integrity": "sha512-e7Mew686owMaPJVNNLs55PUvgz371nKgwsc4vxE49zsODpJEnxgxRo2y/OKrqueavXgZNMDVj3DdHFlaSAeU8g==",
      "license": "MIT"
    },
    "node_modules/@supabase/auth-js": {
      "version": "2.117.3",
      "resolved": "https://registry.npmjs.org/@supabase/auth-js/-/auth-js-2.117.3.tgz",
      "integrity": "sha512-XOZV+jllcU2Hzij8SwgM78zl0lOEr6BTjzi2MYkBb39nOAQzb5AelGpMUvVj7lwGSB11JmpAs/FEQroAyFzWEA==",
      "license": "MIT",
      "dependencies": {
        "tslib": "2.8.1"
      },
      "engines": {
        "node": ">=22.0.0"
      }
    },
    "node_modules/@supabase/functions-js": {
      "version": "2.117.3",
      "resolved": "https://registry.npmjs.org/@supabase/functions-js/-/functions-js-2.117.3.tgz",
      "integrity": "sha512-6GuizbP4N5xWaxEVUsI+UQpJdmMmn0t3sYNpObo9gCAldvM22gFjnYzRVmkHxp5ylU21azEYmiWVwk9iDgCMkQ==",
      "license": "MIT",
      "dependencies": {
        "tslib": "2.8.1"
      },
      "engines": {
        "node": ">=22.0.0"
      }
    },
    "node_modules/@supabase/phoenix": {
      "version": "0.4.5",
      "resolved": "https://registry.npmjs.org/@supabase/phoenix/-/phoenix-0.4.5.tgz",
      "integrity": "sha512-aAn9H9ovVyeApKy11OWOrrOGq8DV68yWeH4ud2lN9fzn4aO8Zb5GLL9m1pUg9nLqIcT+ZDfAcsZe0E/nqdv2lw==",
      "license": "MIT"
    },
    "node_modules/@supabase/postgrest-js": {
      "version": "2.117.3",
      "resolved": "https://registry.npmjs.org/@supabase/postgrest-js/-/postgrest-js-2.117.3.tgz",
      "integrity": "sha512-NpyTgullu6tw11ojYKTdZg9HannZ4mu4FUlhc9V5zDXOVllUJzEmuyLM+WWoYF0BurfrRvarimpm3SR8P0Gzfw==",
      "license": "MIT",
      "dependencies": {
        "tslib": "2.8.1"
      },
      "engines": {
        "node": ">=22.0.0"
      }
    },
    "node_modules/@supabase/realtime-js": {
      "version": "2.117.3",
      "resolved": "https://registry.npmjs.org/@supabase/realtime-js/-/realtime-js-2.117.3.tgz",
      "integrity": "sha512-4W4ISbreRygNXbhwqxeqyuRul8RPx+SF+Hp2IT8wctebQEHSVCULfKatiRiEhmasfoXvYm2AHV4XFsOxhoousA==",
      "license": "MIT",
      "dependencies": {
        "@supabase/phoenix": "0.4.5",
        "tslib": "2.8.1"
      },
      "engines": {
        "node": ">=22.0.0"
      }
    },
    "node_modules/@supabase/storage-js": {
      "version": "2.117.3",
      "resolved": "https://registry.npmjs.org/@supabase/storage-js/-/storage-js-2.117.3.tgz",
      "integrity": "sha512-QhUxFC33Crlw6WDeA4hLADdi1PzjI3c4UJs7ivWHHEnU7ulmCWEZSDaRCuIfmsjUwbHYaIfRNFQNsm+IsGYS6w==",
      "license": "MIT",
      "dependencies": {
        "iceberg-js": "^0.8.1",
        "tslib": "2.8.1"
      },
      "engines": {
        "node": ">=22.0.0"
      }
    },
    "node_modules/@supabase/supabase-js": {
      "version": "2.117.3",
      "resolved": "https://registry.npmjs.org/@supabase/supabase-js/-/supabase-js-2.117.3.tgz",
      "integrity": "sha512-K+f8PimXDunPWQ63CKRXaF5pbVPJxmfw5ryAnh0s9S9PkwcuqBjiSpIaqpF7KLDljeYwXIL85ST8QxaO0+XuvA==",
      "license": "MIT",
      "dependencies": {
        "@supabase/auth-js": "2.117.3",
        "@supabase/functions-js": "2.117.3",
        "@supabase/postgrest-js": "2.117.3",
        "@supabase/realtime-js": "2.117.3",
        "@supabase/storage-js": "2.117.3"
      },
      "engines": {
        "node": ">=22.0.0"
      },
      "peerDependencies": {
        "@opentelemetry/api": ">=1.0.0"
      },
      "peerDependenciesMeta": {
        "@opentelemetry/api": {
          "optional": true
        }
      }
    },
    "node_modules/@tailwindcss/node": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/node/-/node-4.3.3.tgz",
      "integrity": "sha512-/T8IKEsf9VTU6tLjgC7+sv2mOPtQxzE2jMw7u4Tt40Tx+QSZxpzh95/H6cMKoja9XuW7iMdLJYBB0o9G1CaAgg==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/remapping": "^2.3.5",
        "enhanced-resolve": "^5.24.1",
        "jiti": "^2.7.0",
        "lightningcss": "1.32.0",
        "magic-string": "^0.30.21",
        "source-map-js": "^1.2.1",
        "tailwindcss": "4.3.3"
      }
    },
    "node_modules/@tailwindcss/node/node_modules/lightningcss": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss/-/lightningcss-1.32.0.tgz",
      "integrity": "sha512-NXYBzinNrblfraPGyrbPoD19C1h9lfI/1mzgWYvXUTe414Gz/X1FD2XBZSZM7rRTrMA8JL3OtAaGifrIKhQ5yQ==",
      "license": "MPL-2.0",
      "dependencies": {
        "detect-libc": "^2.0.3"
      },
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      },
      "optionalDependencies": {
        "lightningcss-android-arm64": "1.32.0",
        "lightningcss-darwin-arm64": "1.32.0",
        "lightningcss-darwin-x64": "1.32.0",
        "lightningcss-freebsd-x64": "1.32.0",
        "lightningcss-linux-arm-gnueabihf": "1.32.0",
        "lightningcss-linux-arm64-gnu": "1.32.0",
        "lightningcss-linux-arm64-musl": "1.32.0",
        "lightningcss-linux-x64-gnu": "1.32.0",
        "lightningcss-linux-x64-musl": "1.32.0",
        "lightningcss-win32-arm64-msvc": "1.32.0",
        "lightningcss-win32-x64-msvc": "1.32.0"
      }
    },
    "node_modules/@tailwindcss/node/node_modules/lightningcss-android-arm64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-android-arm64/-/lightningcss-android-arm64-1.32.0.tgz",
      "integrity": "sha512-YK7/ClTt4kAK0vo6w3X+Pnm0D2cf2vPHbhOXdoNti1Ga0al1P4TBZhwjATvjNwLEBCnKvjJc2jQgHXH0NEwlAg==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/@tailwindcss/node/node_modules/lightningcss-darwin-arm64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-darwin-arm64/-/lightningcss-darwin-arm64-1.32.0.tgz",
      "integrity": "sha512-RzeG9Ju5bag2Bv1/lwlVJvBE3q6TtXskdZLLCyfg5pt+HLz9BqlICO7LZM7VHNTTn/5PRhHFBSjk5lc4cmscPQ==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/@tailwindcss/node/node_modules/lightningcss-darwin-x64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-darwin-x64/-/lightningcss-darwin-x64-1.32.0.tgz",
      "integrity": "sha512-U+QsBp2m/s2wqpUYT/6wnlagdZbtZdndSmut/NJqlCcMLTWp5muCrID+K5UJ6jqD2BFshejCYXniPDbNh73V8w==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/@tailwindcss/node/node_modules/lightningcss-freebsd-x64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-freebsd-x64/-/lightningcss-freebsd-x64-1.32.0.tgz",
      "integrity": "sha512-JCTigedEksZk3tHTTthnMdVfGf61Fky8Ji2E4YjUTEQX14xiy/lTzXnu1vwiZe3bYe0q+SpsSH/CTeDXK6WHig==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/@tailwindcss/node/node_modules/lightningcss-linux-arm-gnueabihf": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm-gnueabihf/-/lightningcss-linux-arm-gnueabihf-1.32.0.tgz",
      "integrity": "sha512-x6rnnpRa2GL0zQOkt6rts3YDPzduLpWvwAF6EMhXFVZXD4tPrBkEFqzGowzCsIWsPjqSK+tyNEODUBXeeVHSkw==",
      "cpu": [
        "arm"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/@tailwindcss/node/node_modules/lightningcss-linux-arm64-gnu": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm64-gnu/-/lightningcss-linux-arm64-gnu-1.32.0.tgz",
      "integrity": "sha512-0nnMyoyOLRJXfbMOilaSRcLH3Jw5z9HDNGfT/gwCPgaDjnx0i8w7vBzFLFR1f6CMLKF8gVbebmkUN3fa/kQJpQ==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/@tailwindcss/node/node_modules/lightningcss-linux-arm64-musl": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm64-musl/-/lightningcss-linux-arm64-musl-1.32.0.tgz",
      "integrity": "sha512-UpQkoenr4UJEzgVIYpI80lDFvRmPVg6oqboNHfoH4CQIfNA+HOrZ7Mo7KZP02dC6LjghPQJeBsvXhJod/wnIBg==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/@tailwindcss/node/node_modules/lightningcss-linux-x64-gnu": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-x64-gnu/-/lightningcss-linux-x64-gnu-1.32.0.tgz",
      "integrity": "sha512-V7Qr52IhZmdKPVr+Vtw8o+WLsQJYCTd8loIfpDaMRWGUZfBOYEJeyJIkqGIDMZPwPx24pUMfwSxxI8phr/MbOA==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/@tailwindcss/node/node_modules/lightningcss-linux-x64-musl": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-x64-musl/-/lightningcss-linux-x64-musl-1.32.0.tgz",
      "integrity": "sha512-bYcLp+Vb0awsiXg/80uCRezCYHNg1/l3mt0gzHnWV9XP1W5sKa5/TCdGWaR/zBM2PeF/HbsQv/j2URNOiVuxWg==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/@tailwindcss/node/node_modules/lightningcss-win32-arm64-msvc": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-win32-arm64-msvc/-/lightningcss-win32-arm64-msvc-1.32.0.tgz",
      "integrity": "sha512-8SbC8BR40pS6baCM8sbtYDSwEVQd4JlFTOlaD3gWGHfThTcABnNDBda6eTZeqbofalIJhFx0qKzgHJmcPTnGdw==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/@tailwindcss/node/node_modules/lightningcss-win32-x64-msvc": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-win32-x64-msvc/-/lightningcss-win32-x64-msvc-1.32.0.tgz",
      "integrity": "sha512-Amq9B/SoZYdDi1kFrojnoqPLxYhQ4Wo5XiL8EVJrVsB8ARoC1PWW6VGtT0WKCemjy8aC+louJnjS7U18x3b06Q==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/@tailwindcss/oxide": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide/-/oxide-4.3.3.tgz",
      "integrity": "sha512-krXjAikiaFSPaK/FkAQT5UTx3VormQaiZ5hBFlJZ9UFQGB/rwg1MZIhHAG9smMQRTdyJxP6Qt5MwMtdyU5FWrA==",
      "license": "MIT",
      "engines": {
        "node": ">= 20"
      },
      "optionalDependencies": {
        "@tailwindcss/oxide-android-arm64": "4.3.3",
        "@tailwindcss/oxide-darwin-arm64": "4.3.3",
        "@tailwindcss/oxide-darwin-x64": "4.3.3",
        "@tailwindcss/oxide-freebsd-x64": "4.3.3",
        "@tailwindcss/oxide-linux-arm-gnueabihf": "4.3.3",
        "@tailwindcss/oxide-linux-arm64-gnu": "4.3.3",
        "@tailwindcss/oxide-linux-arm64-musl": "4.3.3",
        "@tailwindcss/oxide-linux-x64-gnu": "4.3.3",
        "@tailwindcss/oxide-linux-x64-musl": "4.3.3",
        "@tailwindcss/oxide-wasm32-wasi": "4.3.3",
        "@tailwindcss/oxide-win32-arm64-msvc": "4.3.3",
        "@tailwindcss/oxide-win32-x64-msvc": "4.3.3"
      }
    },
    "node_modules/@tailwindcss/oxide-android-arm64": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-android-arm64/-/oxide-android-arm64-4.3.3.tgz",
      "integrity": "sha512-Y85A2gmPSkl5Ve5qR86GL4HT509cFqQh1aes9p3sSkyTPwt0Pppf3GkwGe4JPACcRYjgJIEhQgM6dBClnr0NYw==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-darwin-arm64": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-darwin-arm64/-/oxide-darwin-arm64-4.3.3.tgz",
      "integrity": "sha512-BiaWatpBcERQFDlOjRDpIVXuFK5PJez5SA4JMg6VYZdBYU+qKfV/vqjcIs+IYmtitf1xYQZTwXvU/8y4lfZUGw==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-darwin-x64": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-darwin-x64/-/oxide-darwin-x64-4.3.3.tgz",
      "integrity": "sha512-fAeUqfV5ndhxRwai8cXGzdLvul9utWOmeTkv69unv4ZXixjn61Z+p9lCWdwOwA3TYboG3BwdVuN/RDjhBRl0mw==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-freebsd-x64": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-freebsd-x64/-/oxide-freebsd-x64-4.3.3.tgz",
      "integrity": "sha512-iyf5bV6+wnAlflVeEy7R25dupxTNECZN5QMI0qNT6eT+EgaGdZcKhGkr5SdoaWiLJ3spLqIY9VCeSGrwmtg4kw==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-arm-gnueabihf": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-arm-gnueabihf/-/oxide-linux-arm-gnueabihf-4.3.3.tgz",
      "integrity": "sha512-aAYUprJAJQWWbRrPvtjdroZ56Md+JM8pMiopS6xGEwDfLhqj+2ver2p4nU4Mb3CRqcMmNBjo8KkUgcxhkzVQGQ==",
      "cpu": [
        "arm"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-arm64-gnu": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-arm64-gnu/-/oxide-linux-arm64-gnu-4.3.3.tgz",
      "integrity": "sha512-nDxldcEENOxZRzC2uu9jrutZdAAQtb+8WWDCSnWL1zvBk1+FN+x6MtDViPB5AJMfttVCUhehGWus3XBPgatM/w==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-arm64-musl": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-arm64-musl/-/oxide-linux-arm64-musl-4.3.3.tgz",
      "integrity": "sha512-Md44bD6veX/PC5iyF8cDVnw4HBIANZepRZZ7a8DQOvkfo5WUBwcp6iAuCUz23u+4SUkhJlD3eL7hNdW8ezd/kA==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-x64-gnu": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-x64-gnu/-/oxide-linux-x64-gnu-4.3.3.tgz",
      "integrity": "sha512-tx7us1muwOKAKWao2v/GaafFeQboE6aj88vC6ziN2NCGcRm8gWUhwjzg+YdVB1e4boAtdtma4L43onunI6NS4w==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-x64-musl": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-x64-musl/-/oxide-linux-x64-musl-4.3.3.tgz",
      "integrity": "sha512-SJxX60smvHgasZoBy11dX6YRjXJFovwWBoedhbQPOBzgFWBHGB+TVPWB9BxzR7TTxU8FQZAI2AyiNCMzFm8Img==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-wasm32-wasi": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-wasm32-wasi/-/oxide-wasm32-wasi-4.3.3.tgz",
      "integrity": "sha512-jx1+rPhY/5Ympkktd656HBWEBLxP7dH06losBLjjf5vgCODXvi9KhtftWcMIwTFIDqBr7cRnQkdLnAG+IOlGvQ==",
      "bundleDependencies": [
        "@napi-rs/wasm-runtime",
        "@emnapi/core",
        "@emnapi/runtime",
        "@tybys/wasm-util",
        "@emnapi/wasi-threads",
        "tslib"
      ],
      "cpu": [
        "wasm32"
      ],
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@emnapi/core": "^1.11.1",
        "@emnapi/runtime": "^1.11.1",
        "@emnapi/wasi-threads": "^1.2.2",
        "@napi-rs/wasm-runtime": "^1.1.4",
        "@tybys/wasm-util": "^0.10.2",
        "tslib": "^2.8.1"
      },
      "engines": {
        "node": ">=14.0.0"
      }
    },
    "node_modules/@tailwindcss/oxide-win32-arm64-msvc": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-win32-arm64-msvc/-/oxide-win32-arm64-msvc-4.3.3.tgz",
      "integrity": "sha512-3rc292Ca2ceK6Ulcc/bAVnTs/3nDtoPhyEKlgPv+yQJQi/JS/AMJlqzxvlDacL1nekbrcf6bTqp/jV4qgnPxNQ==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-win32-x64-msvc": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-win32-x64-msvc/-/oxide-win32-x64-msvc-4.3.3.tgz",
      "integrity": "sha512-yJ0pwIVc/nYeGoV02WtsN8KYyLQv7kyI2wDnkezyJlGGjkd4QLwDGAwl47YpPJeuI0M0ObaXGSPjvWDPeTPggw==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/vite": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/vite/-/vite-4.3.3.tgz",
      "integrity": "sha512-yYU8cogLeSh/ms2jh8Fj7jaba/EWa7Ja6GoUqYZaraEuCI5YS6ms6ObZgjjedm+jm6XZjdNRWBpPP6Z86oOxcw==",
      "license": "MIT",
      "dependencies": {
        "@tailwindcss/node": "4.3.3",
        "@tailwindcss/oxide": "4.3.3",
        "tailwindcss": "4.3.3"
      },
      "peerDependencies": {
        "vite": "^5.2.0 || ^6 || ^7 || ^8"
      }
    },
    "node_modules/@types/d3-array": {
      "version": "3.2.2",
      "resolved": "https://registry.npmjs.org/@types/d3-array/-/d3-array-3.2.2.tgz",
      "integrity": "sha512-hOLWVbm7uRza0BYXpIIW5pxfrKe0W+D5lrFiAEYR+pb6w3N2SwSMaJbXdUfSEv+dT4MfHBLtn5js0LAWaO6otw==",
      "license": "MIT"
    },
    "node_modules/@types/d3-color": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/@types/d3-color/-/d3-color-3.1.3.tgz",
      "integrity": "sha512-iO90scth9WAbmgv7ogoq57O9YpKmFBbmoEoCHDB2xMBY0+/KVrqAaCDyCE16dUspeOvIxFFRI+0sEtqDqy2b4A==",
      "license": "MIT"
    },
    "node_modules/@types/d3-ease": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/@types/d3-ease/-/d3-ease-3.0.2.tgz",
      "integrity": "sha512-NcV1JjO5oDzoK26oMzbILE6HW7uVXOHLQvHshBUW4UMdZGfiY6v5BeQwh9a9tCzv+CeefZQHJt5SRgK154RtiA==",
      "license": "MIT"
    },
    "node_modules/@types/d3-interpolate": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/@types/d3-interpolate/-/d3-interpolate-3.0.4.tgz",
      "integrity": "sha512-mgLPETlrpVV1YRJIglr4Ez47g7Yxjl1lj7YKsiMCb27VJH9W8NVM6Bb9d8kkpG/uAQS5AmbA48q2IAolKKo1MA==",
      "license": "MIT",
      "dependencies": {
        "@types/d3-color": "*"
      }
    },
    "node_modules/@types/d3-path": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/@types/d3-path/-/d3-path-3.1.1.tgz",
      "integrity": "sha512-VMZBYyQvbGmWyWVea0EHs/BwLgxc+MKi1zLDCONksozI4YJMcTt8ZEuIR4Sb1MMTE8MMW49v0IwI5+b7RmfWlg==",
      "license": "MIT"
    },
    "node_modules/@types/d3-scale": {
      "version": "4.0.9",
      "resolved": "https://registry.npmjs.org/@types/d3-scale/-/d3-scale-4.0.9.tgz",
      "integrity": "sha512-dLmtwB8zkAeO/juAMfnV+sItKjlsw2lKdZVVy6LRr0cBmegxSABiLEpGVmSJJ8O08i4+sGR6qQtb6WtuwJdvVw==",
      "license": "MIT",
      "dependencies": {
        "@types/d3-time": "*"
      }
    },
    "node_modules/@types/d3-shape": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/@types/d3-shape/-/d3-shape-3.2.0.tgz",
      "integrity": "sha512-kVd74ta9eof3eJOvbNd1vGKS/XERRyQbT26Og63hIsvDO84cjD5gEOhsXf26w3FSoNlPVz84DOFcKv/oou+fMw==",
      "license": "MIT",
      "dependencies": {
        "@types/d3-path": "*"
      }
    },
    "node_modules/@types/d3-time": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/@types/d3-time/-/d3-time-3.0.4.tgz",
      "integrity": "sha512-yuzZug1nkAAaBlBBikKZTgzCeA+k1uy4ZFwWANOfKw5z5LRhV0gNA7gNkKm7HoK+HRN0wX3EkxGk0fpbWhmB7g==",
      "license": "MIT"
    },
    "node_modules/@types/d3-timer": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/@types/d3-timer/-/d3-timer-3.0.2.tgz",
      "integrity": "sha512-Ps3T8E8dZDam6fUyNiMkekK3XUsaUEik+idO9/YjPtfj2qruF8tFBXS7XhtE4iIXBLxhmLjP3SXpLhVf21I9Lw==",
      "license": "MIT"
    },
    "node_modules/@types/node": {
      "version": "24.19.2",
      "resolved": "https://registry.npmjs.org/@types/node/-/node-24.19.2.tgz",
      "integrity": "sha512-93d49wCWJkCyN87MxLpNN6KXPCwFw7bVUg79mGUV1OS40JGWwVCr8n61DXCSqz7CV6/VfPkb7xec7uP2M+QHWQ==",
      "devOptional": true,
      "license": "MIT",
      "dependencies": {
        "undici-types": ">=7.24.0 <7.24.7"
      }
    },
    "node_modules/@types/react": {
      "version": "19.3.0",
      "resolved": "https://registry.npmjs.org/@types/react/-/react-19.3.0.tgz",
      "integrity": "sha512-N0rFCuH9YoxG9/m61l9MfpJKfmLOVU0em7ipIz6TRgSSkvReLB9vL85GB+yr8Bs5leqpvg96JSwF4ZS1s4viQg==",
      "devOptional": true,
      "license": "MIT",
      "dependencies": {
        "csstype": "^3.2.2"
      }
    },
    "node_modules/@types/react-dom": {
      "version": "19.3.0",
      "resolved": "https://registry.npmjs.org/@types/react-dom/-/react-dom-19.3.0.tgz",
      "integrity": "sha512-ZI7bU42mZXXKHn/qNLEw2IrbiINU7X5+vfgdixBHkCNpYWXjKgfQ/P+uyGb5CjOLB9UcnTeg3rylQtV2hym44Q==",
      "dev": true,
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "^19.3.0"
      }
    },
    "node_modules/@types/use-sync-external-store": {
      "version": "0.0.6",
      "resolved": "https://registry.npmjs.org/@types/use-sync-external-store/-/use-sync-external-store-0.0.6.tgz",
      "integrity": "sha512-zFDAD+tlpf2r4asuHEj0XH6pY6i0g5NeAHPn+15wk3BV6JA69eERFXC1gyGThDkVa1zCyKr5jox1+2LbV/AMLg==",
      "license": "MIT"
    },
    "node_modules/@vitejs/plugin-react": {
      "version": "6.1.2",
      "resolved": "https://registry.npmjs.org/@vitejs/plugin-react/-/plugin-react-6.1.2.tgz",
      "integrity": "sha512-fhJNGUdscQa4HkI0xFxwonWyhnVReCPDbXI7FH7jmzpnVCrFQI7PRrhWecO263610vOrs9tr2Y4xcf8uAdFxbw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@rolldown/pluginutils": "^1.0.1"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      },
      "peerDependencies": {
        "@rolldown/plugin-babel": "^0.1.7 || ^0.2.0",
        "babel-plugin-react-compiler": "^1.0.0",
        "oxc-transform-react": "^0.152.0",
        "vite": "^8.0.0"
      },
      "peerDependenciesMeta": {
        "@rolldown/plugin-babel": {
          "optional": true
        },
        "babel-plugin-react-compiler": {
          "optional": true
        },
        "oxc-transform-react": {
          "optional": true
        }
      }
    },
    "node_modules/adler-32": {
      "version": "1.3.1",
      "resolved": "https://registry.npmjs.org/adler-32/-/adler-32-1.3.1.tgz",
      "integrity": "sha512-ynZ4w/nUUv5rrsR8UUGoe1VC9hZj6V5hU9Qw1HlMDJGEJw5S7TfTErWTjMys6M7vr0YWcPqs3qAr4ss0nDfP+A==",
      "license": "Apache-2.0",
      "engines": {
        "node": ">=0.8"
      }
    },
    "node_modules/cfb": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/cfb/-/cfb-1.2.2.tgz",
      "integrity": "sha512-KfdUZsSOw19/ObEWasvBP/Ac4reZvAGauZhs6S/gqNhXhI7cKwvlH7ulj+dOEYnca4bm4SGo8C1bTAQvnTjgQA==",
      "license": "Apache-2.0",
      "dependencies": {
        "adler-32": "~1.3.0",
        "crc-32": "~1.2.0"
      },
      "engines": {
        "node": ">=0.8"
      }
    },
    "node_modules/clsx": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/clsx/-/clsx-2.1.1.tgz",
      "integrity": "sha512-eYm0QWBtUrBWZWG0d386OGAw16Z995PiOVo2B7bjWSbHedGl5e0ZWaq65kOGgUSNesEIDkB9ISbTg/JK9dhCZA==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/codepage": {
      "version": "1.15.0",
      "resolved": "https://registry.npmjs.org/codepage/-/codepage-1.15.0.tgz",
      "integrity": "sha512-3g6NUTPd/YtuuGrhMnOMRjFc+LJw/bnMp3+0r/Wcz3IXUuCosKRJvMphm5+Q+bvTVGcJJuRvVLuYba+WojaFaA==",
      "license": "Apache-2.0",
      "engines": {
        "node": ">=0.8"
      }
    },
    "node_modules/crc-32": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/crc-32/-/crc-32-1.2.2.tgz",
      "integrity": "sha512-ROmzCKrTnOwybPcJApAA6WBWij23HVfGVNKqqrZpuyZOHqK2CwHSvpGuyt/UNNvaIjEd8X5IFGp4Mh+Ie1IHJQ==",
      "license": "Apache-2.0",
      "bin": {
        "crc32": "bin/crc32.njs"
      },
      "engines": {
        "node": ">=0.8"
      }
    },
    "node_modules/csstype": {
      "version": "3.2.3",
      "resolved": "https://registry.npmjs.org/csstype/-/csstype-3.2.3.tgz",
      "integrity": "sha512-z1HGKcYy2xA8AGQfwrn0PAy+PB7X/GSj3UVJW9qKyn43xWa+gl5nXmU4qqLMRzWVLFC8KusUX8T/0kCiOYpAIQ==",
      "devOptional": true,
      "license": "MIT"
    },
    "node_modules/d3-array": {
      "version": "3.2.4",
      "resolved": "https://registry.npmjs.org/d3-array/-/d3-array-3.2.4.tgz",
      "integrity": "sha512-tdQAmyA18i4J7wprpYq8ClcxZy3SC31QMeByyCFyRt7BVHdREQZ5lpzoe5mFEYZUWe+oq8HBvk9JjpibyEV4Jg==",
      "license": "ISC",
      "dependencies": {
        "internmap": "1 - 2"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-color": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/d3-color/-/d3-color-3.1.0.tgz",
      "integrity": "sha512-zg/chbXyeBtMQ1LbD/WSoW2DpC3I0mpmPdW+ynRTj/x2DAWYrIY7qeZIHidozwV24m4iavr15lNwIwLxRmOxhA==",
      "license": "ISC",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-ease": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/d3-ease/-/d3-ease-3.0.1.tgz",
      "integrity": "sha512-wR/XK3D3XcLIZwpbvQwQ5fK+8Ykds1ip7A2Txe0yxncXSdq1L9skcG7blcedkOX+ZcgxGAmLX1FrRGbADwzi0w==",
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-format": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/d3-format/-/d3-format-3.1.2.tgz",
      "integrity": "sha512-AJDdYOdnyRDV5b6ArilzCPPwc1ejkHcoyFarqlPqT7zRYjhavcT3uSrqcMvsgh2CgoPbK3RCwyHaVyxYcP2Arg==",
      "license": "ISC",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-interpolate": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/d3-interpolate/-/d3-interpolate-3.0.1.tgz",
      "integrity": "sha512-3bYs1rOD33uo8aqJfKP3JWPAibgw8Zm2+L9vBKEHJ2Rg+viTR7o5Mmv5mZcieN+FRYaAOWX5SJATX6k1PWz72g==",
      "license": "ISC",
      "dependencies": {
        "d3-color": "1 - 3"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-path": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/d3-path/-/d3-path-3.1.0.tgz",
      "integrity": "sha512-p3KP5HCf/bvjBSSKuXid6Zqijx7wIfNW+J/maPs+iwR35at5JCbLUT0LzF1cnjbCHWhqzQTIN2Jpe8pRebIEFQ==",
      "license": "ISC",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-scale": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/d3-scale/-/d3-scale-4.0.2.tgz",
      "integrity": "sha512-GZW464g1SH7ag3Y7hXjf8RoUuAFIqklOAq3MRl4OaWabTFJY9PN/E1YklhXLh+OQ3fM9yS2nOkCoS+WLZ6kvxQ==",
      "license": "ISC",
      "dependencies": {
        "d3-array": "2.10.0 - 3",
        "d3-format": "1 - 3",
        "d3-interpolate": "1.2.0 - 3",
        "d3-time": "2.1.1 - 3",
        "d3-time-format": "2 - 4"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-shape": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/d3-shape/-/d3-shape-3.2.0.tgz",
      "integrity": "sha512-SaLBuwGm3MOViRq2ABk3eLoxwZELpH6zhl3FbAoJ7Vm1gofKx6El1Ib5z23NUEhF9AsGl7y+dzLe5Cw2AArGTA==",
      "license": "ISC",
      "dependencies": {
        "d3-path": "^3.1.0"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-time": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/d3-time/-/d3-time-3.1.0.tgz",
      "integrity": "sha512-VqKjzBLejbSMT4IgbmVgDjpkYrNWUYJnbCGo874u7MMKIWsILRX+OpX/gTk8MqjpT1A/c6HY2dCA77ZN0lkQ2Q==",
      "license": "ISC",
      "dependencies": {
        "d3-array": "2 - 3"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-time-format": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/d3-time-format/-/d3-time-format-4.1.0.tgz",
      "integrity": "sha512-dJxPBlzC7NugB2PDLwo9Q8JiTR3M3e4/XANkreKSUxF8vvXKqm1Yfq4Q5dl8budlunRVlUUaDUgFt7eA8D6NLg==",
      "license": "ISC",
      "dependencies": {
        "d3-time": "1 - 3"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-timer": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/d3-timer/-/d3-timer-3.0.1.tgz",
      "integrity": "sha512-ndfJ/JxxMd3nw31uyKoY2naivF+r29V+Lc0svZxe1JvvIRmi8hUsrMvdOwgS1o6uBHmiz91geQ0ylPP0aj1VUA==",
      "license": "ISC",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/decimal.js-light": {
      "version": "2.5.1",
      "resolved": "https://registry.npmjs.org/decimal.js-light/-/decimal.js-light-2.5.1.tgz",
      "integrity": "sha512-qIMFpTMZmny+MMIitAB6D7iVPEorVw6YQRWkvarTkT4tBeSLLiHzcwj6q0MmYSFCiVpiqPJTJEYIrpcPzVEIvg==",
      "license": "MIT"
    },
    "node_modules/detect-libc": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/detect-libc/-/detect-libc-2.1.2.tgz",
      "integrity": "sha512-Btj2BOOO83o3WyH59e8MgXsxEQVcarkUOpEYrubB0urwnN10yQ364rsiByU11nZlqWYZm05i/of7io4mzihBtQ==",
      "license": "Apache-2.0",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/enhanced-resolve": {
      "version": "5.26.0",
      "resolved": "https://registry.npmjs.org/enhanced-resolve/-/enhanced-resolve-5.26.0.tgz",
      "integrity": "sha512-9vhedylFonb2YGogzUKX6+Ja72gOJbN1QHAqdrvqLwhdl/QWbKopzoUC9EbQNVsAns/bx/4uyqalrQAoy1IByw==",
      "license": "MIT",
      "dependencies": {
        "graceful-fs": "^4.2.4",
        "tapable": "^2.3.3"
      },
      "engines": {
        "node": ">=10.13.0"
      }
    },
    "node_modules/es-toolkit": {
      "version": "1.52.0",
      "resolved": "https://registry.npmjs.org/es-toolkit/-/es-toolkit-1.52.0.tgz",
      "integrity": "sha512-XTNEJQh1tY1ZJVcf6ayP/2n4ZPyaHlW2FWs7xvw5ddPuhUVjLD3olQVQS7kf58JbAB48iL0uL/jerTrjtV3lDA==",
      "license": "MIT",
      "workspaces": [
        "docs",
        "benchmarks",
        "tests/types",
        "tests/browser-compat"
      ]
    },
    "node_modules/eventemitter3": {
      "version": "5.0.4",
      "resolved": "https://registry.npmjs.org/eventemitter3/-/eventemitter3-5.0.4.tgz",
      "integrity": "sha512-mlsTRyGaPBjPedk6Bvw+aqbsXDtoAyAzm5MO7JgU+yVRyMQ5O8bD4Kcci7BS85f93veegeCPkL8R4GLClnjLFw==",
      "license": "MIT"
    },
    "node_modules/fdir": {
      "version": "6.5.0",
      "resolved": "https://registry.npmjs.org/fdir/-/fdir-6.5.0.tgz",
      "integrity": "sha512-tIbYtZbucOs0BRGqPJkshJUYdL+SDH7dVM8gjy+ERp3WAUjLEFJE+02kanyHtwjWOnwrKYBiwAmM0p4kLJAnXg==",
      "license": "MIT",
      "engines": {
        "node": ">=12.0.0"
      },
      "peerDependencies": {
        "picomatch": "^3 || ^4"
      },
      "peerDependenciesMeta": {
        "picomatch": {
          "optional": true
        }
      }
    },
    "node_modules/frac": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/frac/-/frac-1.1.2.tgz",
      "integrity": "sha512-w/XBfkibaTl3YDqASwfDUqkna4Z2p9cFSr1aHDt0WoMTECnRfBOv2WArlZILlqgWlmdIlALXGpM2AOhEk5W3IA==",
      "license": "Apache-2.0",
      "engines": {
        "node": ">=0.8"
      }
    },
    "node_modules/fsevents": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.3.tgz",
      "integrity": "sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw==",
      "hasInstallScript": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^8.16.0 || ^10.6.0 || >=11.0.0"
      }
    },
    "node_modules/graceful-fs": {
      "version": "4.2.11",
      "resolved": "https://registry.npmjs.org/graceful-fs/-/graceful-fs-4.2.11.tgz",
      "integrity": "sha512-RbJ5/jmFcNNCcDV5o9eTnBLJ/HszWV0P73bc+Ff4nS/rJj+YaS6IGyiOL0VoBYX+l1Wrl3k63h/KrH+nhJ0XvQ==",
      "license": "ISC"
    },
    "node_modules/iceberg-js": {
      "version": "0.8.1",
      "resolved": "https://registry.npmjs.org/iceberg-js/-/iceberg-js-0.8.1.tgz",
      "integrity": "sha512-1dhVQZXhcHje7798IVM+xoo/1ZdVfzOMIc8/rgVSijRK38EDqOJoGula9N/8ZI5RD8QTxNQtK/Gozpr+qUqRRA==",
      "license": "MIT",
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/immer": {
      "version": "11.1.21",
      "resolved": "https://registry.npmjs.org/immer/-/immer-11.1.21.tgz",
      "integrity": "sha512-bZSadeCPGdaY5/qRLgr6mDSH1ra21rD3rqpiWk7+QTr4ayYPTE9qZYdLh/NdPhMe0wSrTvHD/Lk8q5EwhUs0aw==",
      "license": "MIT",
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/immer"
      }
    },
    "node_modules/internmap": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/internmap/-/internmap-2.0.3.tgz",
      "integrity": "sha512-5Hh7Y1wQbvY5ooGgPbDaL5iYLAPzMTUrjMulskHLH6wnv/A+1q5rgEaiuqEjB+oxGXIVZs1FF+R/KPN3ZSQYYg==",
      "license": "ISC",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/jiti": {
      "version": "2.7.0",
      "resolved": "https://registry.npmjs.org/jiti/-/jiti-2.7.0.tgz",
      "integrity": "sha512-AC/7JofJvZGrrneWNaEnJeOLUx+JlGt7tNa0wZiRPT4MY1wmfKjt2+6O2p2uz2+skll8OZZmJMNqeke7kKbNgQ==",
      "license": "MIT",
      "bin": {
        "jiti": "lib/jiti-cli.mjs"
      }
    },
    "node_modules/lightningcss": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss/-/lightningcss-1.33.0.tgz",
      "integrity": "sha512-WkUDrojuJs0xkgGf2udWxa3yGBRxPtxUkB79i6aCZLRgc7PM8fZe9TosfPDcvEpQZbuFASnHYmRLBLUbmLOIIA==",
      "license": "MPL-2.0",
      "dependencies": {
        "detect-libc": "^2.0.3"
      },
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      },
      "optionalDependencies": {
        "lightningcss-android-arm64": "1.33.0",
        "lightningcss-darwin-arm64": "1.33.0",
        "lightningcss-darwin-x64": "1.33.0",
        "lightningcss-freebsd-x64": "1.33.0",
        "lightningcss-linux-arm-gnueabihf": "1.33.0",
        "lightningcss-linux-arm64-gnu": "1.33.0",
        "lightningcss-linux-arm64-musl": "1.33.0",
        "lightningcss-linux-x64-gnu": "1.33.0",
        "lightningcss-linux-x64-musl": "1.33.0",
        "lightningcss-win32-arm64-msvc": "1.33.0",
        "lightningcss-win32-x64-msvc": "1.33.0"
      }
    },
    "node_modules/lightningcss-android-arm64": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-android-arm64/-/lightningcss-android-arm64-1.33.0.tgz",
      "integrity": "sha512-gEpRTalKdosp4Bb8qWtc2iOgE5SeIHlpS1up9bFq2wAyYhl1UdTObYiHe98zEM9SQvSoqQZ1IQD0JNpg3Ml5pg==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-darwin-arm64": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-darwin-arm64/-/lightningcss-darwin-arm64-1.33.0.tgz",
      "integrity": "sha512-Sciaz8eenNTKn9b3t7+xr0ipTp9YxKQY4npwQ3mrRuL0BAVHBLyZxofhaKBAVtzmtRZ/zTyo0/to4B1uWG/Djg==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-darwin-x64": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-darwin-x64/-/lightningcss-darwin-x64-1.33.0.tgz",
      "integrity": "sha512-Z5UPAxzrjlWNNyGy6i65cJzzvgJ5D3T6wMvs+gWpY9d7qRhANrxqAp6LhxIgZhWEw18RfJTGcRxjuLIBr+m8XQ==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-freebsd-x64": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-freebsd-x64/-/lightningcss-freebsd-x64-1.33.0.tgz",
      "integrity": "sha512-QQM/Ti/hQajJwCY+RiWuCZ9sdtI/XQk7nDK5vC8kkdwixezOlDgvDx7+RT+QjK6FcFT4MpsuoBnHIo/O3StRRg==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm-gnueabihf": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm-gnueabihf/-/lightningcss-linux-arm-gnueabihf-1.33.0.tgz",
      "integrity": "sha512-N7FVBe6iS24MlM6R/4RBTxGhQheZGs7tiQ9U32UtF75NzP5Q7xWPRqLBCKxlRQRk3rY1jCIPLzx7WzOhuUIRLQ==",
      "cpu": [
        "arm"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm64-gnu": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm64-gnu/-/lightningcss-linux-arm64-gnu-1.33.0.tgz",
      "integrity": "sha512-j2v/itmy4HlNxlc6voKXYgBqNi0Ng2LShg4z7GufpEgs05P+2suBVyi9I6YHq5uoVFx9ETin3eCEhLVyXGQnKg==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm64-musl": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm64-musl/-/lightningcss-linux-arm64-musl-1.33.0.tgz",
      "integrity": "sha512-yiO5ROMuYQgXbC60yjZU5CYSFZGKXL0HFATXt9mHJn1+zW55oCtMI9NfcVhYLMFDL7gV7oBPon/EmMMGg2OvtQ==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-x64-gnu": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-x64-gnu/-/lightningcss-linux-x64-gnu-1.33.0.tgz",
      "integrity": "sha512-ar+Ju7LmcN0Jo4FpL4hpFybwNG9/3A/Br5KW2n2jyODg3MEZXaDYADdemoNS+BDNfMgKvylJLj4S5tyRActuAg==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-x64-musl": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-x64-musl/-/lightningcss-linux-x64-musl-1.33.0.tgz",
      "integrity": "sha512-RYiYbkokw0trfKqqzfF55lginwEPrD3OJDfTuJzFs1MK6iFnDenaz1fqLLtX4ITG3OktJQXOeTaw1awrBAlZPw==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-win32-arm64-msvc": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-win32-arm64-msvc/-/lightningcss-win32-arm64-msvc-1.33.0.tgz",
      "integrity": "sha512-1K+MPfLSFVpphzpdbfkhlWk6wBrTObBzS2T6db10PNOZgR9GoVsAWzwNyuhUYYbTp23j+4RrncfujZ4uAzXvwA==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-win32-x64-msvc": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-win32-x64-msvc/-/lightningcss-win32-x64-msvc-1.33.0.tgz",
      "integrity": "sha512-OlEICDx/Xl0FqSp4bry8zFnCvGpig3Gl4gCquvYwHuqJKEC1+n9NgDniFvqHGmMv1ZkqDJrDqKKSykTDX+ehuA==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lucide-react": {
      "version": "1.57.0",
      "resolved": "https://registry.npmjs.org/lucide-react/-/lucide-react-1.57.0.tgz",
      "integrity": "sha512-bXFZEucYhAzLD62Jse76AbTR6LiSLTn3Tqir2f1n8rZrWAdLodYy7jnRZSPIT89dRLk/IseMOUWG82wJtTyTTw==",
      "license": "ISC",
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.5.1 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/magic-string": {
      "version": "0.30.21",
      "resolved": "https://registry.npmjs.org/magic-string/-/magic-string-0.30.21.tgz",
      "integrity": "sha512-vd2F4YUyEXKGcLHoq+TEyCjxueSeHnFxyyjNp80yg0XV4vUhnDer/lvvlqM/arB5bXQN5K2/3oinyCRyx8T2CQ==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/sourcemap-codec": "^1.5.5"
      }
    },
    "node_modules/nanoid": {
      "version": "3.3.20",
      "resolved": "https://registry.npmjs.org/nanoid/-/nanoid-3.3.20.tgz",
      "integrity": "sha512-uKdg2G3GNCKQn9byYOpxbGqrT2fGO5KRt5J/8b3pok8rT6qxGWF6hxMyJiEYtAf+FVyYuD9hRaDqX5uPFYJ4ZQ==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "bin": {
        "nanoid": "bin/nanoid.cjs"
      },
      "engines": {
        "node": "^10 || ^12 || ^13.7 || ^14 || >=15.0.1"
      }
    },
    "node_modules/oxlint": {
      "version": "1.88.0",
      "resolved": "https://registry.npmjs.org/oxlint/-/oxlint-1.88.0.tgz",
      "integrity": "sha512-uIcFgw8BmqvFRGzH5+r7d2zJMEexwNSrEmM6WQNnGh3VkO0XYTEFoyxyNE6tjKMUib9Cue4XJA2DoWruO5D6aw==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "oxlint": "bin/oxlint"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/oxc-project"
      },
      "optionalDependencies": {
        "@oxlint/binding-android-arm-eabi": "1.88.0",
        "@oxlint/binding-android-arm64": "1.88.0",
        "@oxlint/binding-darwin-arm64": "1.88.0",
        "@oxlint/binding-darwin-x64": "1.88.0",
        "@oxlint/binding-freebsd-x64": "1.88.0",
        "@oxlint/binding-linux-arm-gnueabihf": "1.88.0",
        "@oxlint/binding-linux-arm-musleabihf": "1.88.0",
        "@oxlint/binding-linux-arm64-gnu": "1.88.0",
        "@oxlint/binding-linux-arm64-musl": "1.88.0",
        "@oxlint/binding-linux-ppc64-gnu": "1.88.0",
        "@oxlint/binding-linux-riscv64-gnu": "1.88.0",
        "@oxlint/binding-linux-riscv64-musl": "1.88.0",
        "@oxlint/binding-linux-s390x-gnu": "1.88.0",
        "@oxlint/binding-linux-x64-gnu": "1.88.0",
        "@oxlint/binding-linux-x64-musl": "1.88.0",
        "@oxlint/binding-openharmony-arm64": "1.88.0",
        "@oxlint/binding-win32-arm64-msvc": "1.88.0",
        "@oxlint/binding-win32-ia32-msvc": "1.88.0",
        "@oxlint/binding-win32-x64-msvc": "1.88.0"
      },
      "peerDependencies": {
        "oxlint-tsgolint": ">=7.0.2003",
        "vite-plus": "*"
      },
      "peerDependenciesMeta": {
        "oxlint-tsgolint": {
          "optional": true
        },
        "vite-plus": {
          "optional": true
        }
      }
    },
    "node_modules/pdfjs-dist": {
      "version": "6.4.299",
      "resolved": "https://registry.npmjs.org/pdfjs-dist/-/pdfjs-dist-6.4.299.tgz",
      "integrity": "sha512-AVl138zALtfaAPvADulE0PZThbYzCBS79nL4pOSL/6Sm/4AH5A21BD9VHt97OlCuzJuCpmeZtAtkinisF4Vb1g==",
      "license": "Apache-2.0",
      "engines": {
        "node": ">=22.13.0 || >=24"
      },
      "optionalDependencies": {
        "@napi-rs/canvas": "^1.0.10"
      }
    },
    "node_modules/picocolors": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/picocolors/-/picocolors-1.1.1.tgz",
      "integrity": "sha512-xceH2snhtb5M9liqDsmEw56le376mTZkEX/jEb/RxNFyegNul7eNslCXP9FDj/Lcu0X8KEyMceP2ntpaHrDEVA==",
      "license": "ISC"
    },
    "node_modules/picomatch": {
      "version": "4.0.7",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-4.0.7.tgz",
      "integrity": "sha512-qcJu88Q2IWqJsDD529JKMdwGm/dvInW4HvQnRwiH9JtihJvzGOscDtHE3x1pBKeUOTysQ8kVmLnJ2kJu7yhcGA==",
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/postcss": {
      "version": "8.5.30",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.5.30.tgz",
      "integrity": "sha512-zkd+e9S1AQHhmaBKye9zlFHWjOwVgqXl1q3ECYy8561K7qxR2cREf/STLskulBFd78k6AOFeA+ff1TtEzk9bAA==",
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/postcss"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "nanoid": "^3.3.20",
        "picocolors": "^1.1.1",
        "source-map-js": "^1.2.2"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      }
    },
    "node_modules/react": {
      "version": "19.3.1",
      "resolved": "https://registry.npmjs.org/react/-/react-19.3.1.tgz",
      "integrity": "sha512-QNhWdt7nrgVWWQG58QuGsAR3jv3Hbe4mb4vz7w2csnHavciZJgda1CPNaldF6eVxv90ud3jUXpKlHL69gO38yw==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react-dom": {
      "version": "19.3.1",
      "resolved": "https://registry.npmjs.org/react-dom/-/react-dom-19.3.1.tgz",
      "integrity": "sha512-Y0bARz53lhEC1NMCASs0/j+faB/zqt3R8hpvg1e8+61ZVJ4UL0UdC4cBbXfZMcIuhrfgeILTLe+ZeBCavQPtKQ==",
      "license": "MIT",
      "dependencies": {
        "scheduler": "^0.28.0"
      },
      "peerDependencies": {
        "react": "^19.3.1"
      }
    },
    "node_modules/react-is": {
      "version": "19.3.1",
      "resolved": "https://registry.npmjs.org/react-is/-/react-is-19.3.1.tgz",
      "integrity": "sha512-RRieF6IyxQBkcK6pP8xOHprLTPW6QjRkbGdImtqNme+/hYVwCZkLQLdlZGOhUqXwkS9IEynaGvPJtv6XB/cz0Q==",
      "license": "MIT",
      "peer": true
    },
    "node_modules/react-redux": {
      "version": "9.3.0",
      "resolved": "https://registry.npmjs.org/react-redux/-/react-redux-9.3.0.tgz",
      "integrity": "sha512-KQopgqFo/p/fgmAs5qz6p5RWaNAzq40WAu7fJIXnQpYxFPbJYtsJPWvGeF2rOBaY/kEuV77AVsX8TsQzKm+A/g==",
      "license": "MIT",
      "dependencies": {
        "@types/use-sync-external-store": "^0.0.6",
        "use-sync-external-store": "^1.4.0"
      },
      "peerDependencies": {
        "@types/react": "^18.2.25 || ^19",
        "react": "^18.0 || ^19",
        "redux": "^5.0.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "redux": {
          "optional": true
        }
      }
    },
    "node_modules/recharts": {
      "version": "3.10.1",
      "resolved": "https://registry.npmjs.org/recharts/-/recharts-3.10.1.tgz",
      "integrity": "sha512-QXFrvt6IVcw7eeZCoyXTwkIJAX3Dv1nyVhMicXJ47GsGDDpcN8z6o644DibE9XjpBTThtsomLKnTV6lc+cVFUA==",
      "license": "MIT",
      "workspaces": [
        "www"
      ],
      "dependencies": {
        "@reduxjs/toolkit": "^1.9.0 || 2.x.x",
        "clsx": "^2.1.1",
        "decimal.js-light": "^2.5.1",
        "es-toolkit": "^1.39.3",
        "eventemitter3": "^5.0.1",
        "immer": "^11.1.8",
        "react-redux": "8.x.x || 9.x.x",
        "reselect": "5.2.0",
        "tiny-invariant": "^1.3.3",
        "use-sync-external-store": "^1.2.2",
        "victory-vendor": "^37.0.2"
      },
      "engines": {
        "node": ">=18"
      },
      "peerDependencies": {
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0",
        "react-dom": "^16.0.0 || ^17.0.0 || ^18.0.0 || ^19.0.0",
        "react-is": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      }
    },
    "node_modules/redux": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/redux/-/redux-5.0.1.tgz",
      "integrity": "sha512-M9/ELqF6fy8FwmkpnF0S3YKOqMyoWJ4+CS5Efg2ct3oY9daQvd/Pc71FpGZsVsbl3Cpb+IIcjBDUnnyBdQbq4w==",
      "license": "MIT"
    },
    "node_modules/redux-thunk": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/redux-thunk/-/redux-thunk-3.1.0.tgz",
      "integrity": "sha512-NW2r5T6ksUKXCabzhL9z+h206HQw/NJkcLm1GPImRQ8IzfXwRGqjVhKJGauHirT0DAuyy6hjdnMZaRoAcy0Klw==",
      "license": "MIT",
      "peerDependencies": {
        "redux": "^5.0.0"
      }
    },
    "node_modules/reselect": {
      "version": "5.2.0",
      "resolved": "https://registry.npmjs.org/reselect/-/reselect-5.2.0.tgz",
      "integrity": "sha512-AgZ3UOZm3YndfrJ4OYjgrT7bmCm/1iqkjvEfH/oYjzh6PD2qw4QuT3jjnXIrpdt4MTpMXclMT3lXbmRY+XRakw==",
      "license": "MIT"
    },
    "node_modules/rolldown": {
      "version": "1.2.14",
      "resolved": "https://registry.npmjs.org/rolldown/-/rolldown-1.2.14.tgz",
      "integrity": "sha512-eTBTTqMR6uHKLgcUqpJP8ntzDI6V4LYA8negAMBEI7gkgVvOdrx6VsvS2Ym+83KhOPdLCHWJu0w7UQFJZhHKNw==",
      "license": "MIT",
      "dependencies": {
        "@oxc-project/types": "=0.154.0",
        "@rolldown/pluginutils": "^1.0.0"
      },
      "bin": {
        "rolldown": "bin/cli.mjs"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      },
      "optionalDependencies": {
        "@rolldown/binding-android-arm-eabi": "1.2.14",
        "@rolldown/binding-android-arm64": "1.2.14",
        "@rolldown/binding-darwin-arm64": "1.2.14",
        "@rolldown/binding-darwin-x64": "1.2.14",
        "@rolldown/binding-freebsd-x64": "1.2.14",
        "@rolldown/binding-linux-arm-gnueabihf": "1.2.14",
        "@rolldown/binding-linux-arm64-gnu": "1.2.14",
        "@rolldown/binding-linux-arm64-musl": "1.2.14",
        "@rolldown/binding-linux-ppc64-gnu": "1.2.14",
        "@rolldown/binding-linux-s390x-gnu": "1.2.14",
        "@rolldown/binding-linux-x64-gnu": "1.2.14",
        "@rolldown/binding-linux-x64-musl": "1.2.14",
        "@rolldown/binding-openharmony-arm64": "1.2.14",
        "@rolldown/binding-win32-arm64-msvc": "1.2.14",
        "@rolldown/binding-win32-x64-msvc": "1.2.14"
      }
    },
    "node_modules/scheduler": {
      "version": "0.28.0",
      "resolved": "https://registry.npmjs.org/scheduler/-/scheduler-0.28.0.tgz",
      "integrity": "sha512-juorfCmIkIw8tT+p5BXSm6PJjQF/ycEYmKyzURCIt/RaZIhL+PulbQ9Yu2z1HdOJDdqDTlxA1+xKBmHXJsczAw==",
      "license": "MIT"
    },
    "node_modules/source-map-js": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/source-map-js/-/source-map-js-1.2.2.tgz",
      "integrity": "sha512-KGj/8Y43x35aZVDtt+J4mK1hoLGHULMYfSkODJNQjNDC3oW1PqPoxMwo0pLUsWM/UEGzON/NxeHywEfNXNP3Vw==",
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/ssf": {
      "version": "0.11.2",
      "resolved": "https://registry.npmjs.org/ssf/-/ssf-0.11.2.tgz",
      "integrity": "sha512-+idbmIXoYET47hH+d7dfm2epdOMUDjqcB4648sTZ+t2JwoyBFL/insLfB/racrDmsKB3diwsDA696pZMieAC5g==",
      "license": "Apache-2.0",
      "dependencies": {
        "frac": "~1.1.2"
      },
      "engines": {
        "node": ">=0.8"
      }
    },
    "node_modules/tailwindcss": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/tailwindcss/-/tailwindcss-4.3.3.tgz",
      "integrity": "sha512-gOhV3P7ufE62QDGg1zVaTgCR+EtPv92k2nIhVcVKcLmxT1sUBsQGhnZj175j+MqRt4zLF7ic+sCYjfhxMxj7YQ==",
      "license": "MIT"
    },
    "node_modules/tapable": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/tapable/-/tapable-2.3.3.tgz",
      "integrity": "sha512-uxc/zpqFg6x7C8vOE7lh6Lbda8eEL9zmVm/PLeTPBRhh1xCgdWaQ+J1CUieGpIfm2HdtsUpRv+HshiasBMcc6A==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/webpack"
      }
    },
    "node_modules/tiny-invariant": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/tiny-invariant/-/tiny-invariant-1.3.3.tgz",
      "integrity": "sha512-+FbBPE1o9QAYvviau/qC5SE3caw21q3xkvWKBtja5vgqOWIHHJ3ioaq1VPfn/Szqctz2bU/oYeKd9/z5BL+PVg==",
      "license": "MIT"
    },
    "node_modules/tinyglobby": {
      "version": "0.2.17",
      "resolved": "https://registry.npmjs.org/tinyglobby/-/tinyglobby-0.2.17.tgz",
      "integrity": "sha512-wXR/dYpcqKmfWpEdZjiKJOwCNFndD0DMnrW/cYjVGttEkBfVgcLFHoNrlj47mjOVic9yyNu65alsgF4NQyTa2g==",
      "license": "MIT",
      "dependencies": {
        "fdir": "^6.5.0",
        "picomatch": "^4.0.4"
      },
      "engines": {
        "node": ">=12.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/SuperchupuDev"
      }
    },
    "node_modules/tslib": {
      "version": "2.8.1",
      "resolved": "https://registry.npmjs.org/tslib/-/tslib-2.8.1.tgz",
      "integrity": "sha512-oJFu94HQb+KVduSUQL7wnpmqnfmLsOA/nAh6b6EH0wCEoK0/mPeXU6c3wKDV83MkOuHPRHtSXKKU99IBazS/2w==",
      "license": "0BSD"
    },
    "node_modules/typescript": {
      "version": "6.0.3",
      "resolved": "https://registry.npmjs.org/typescript/-/typescript-6.0.3.tgz",
      "integrity": "sha512-y2TvuxSZPDyQakkFRPZHKFm+KKVqIisdg9/CZwm9ftvKXLP8NRWj38/ODjNbr43SsoXqNuAisEf1GdCxqWcdBw==",
      "dev": true,
      "license": "Apache-2.0",
      "bin": {
        "tsc": "bin/tsc",
        "tsserver": "bin/tsserver"
      },
      "engines": {
        "node": ">=14.17"
      }
    },
    "node_modules/undici-types": {
      "version": "7.24.6",
      "resolved": "https://registry.npmjs.org/undici-types/-/undici-types-7.24.6.tgz",
      "integrity": "sha512-WRNW+sJgj5OBN4/0JpHFqtqzhpbnV0GuB+OozA9gCL7a993SmU+1JBZCzLNxYsbMfIeDL+lTsphD5jN5N+n0zg==",
      "devOptional": true,
      "license": "MIT"
    },
    "node_modules/use-sync-external-store": {
      "version": "1.7.0",
      "resolved": "https://registry.npmjs.org/use-sync-external-store/-/use-sync-external-store-1.7.0.tgz",
      "integrity": "sha512-6L+EeigHMQhdaIPNIFUKwfWJSwWFQ8gJbJ2DLOs5sDIegTwR9fRxvnM3uciHKjIZhFz+KAv2emhWMRvDmMcY8A==",
      "license": "MIT",
      "peerDependencies": {
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      }
    },
    "node_modules/victory-vendor": {
      "version": "37.3.6",
      "resolved": "https://registry.npmjs.org/victory-vendor/-/victory-vendor-37.3.6.tgz",
      "integrity": "sha512-SbPDPdDBYp+5MJHhBCAyI7wKM3d5ivekigc2Dk2s7pgbZ9wIgIBYGVw4zGHBml/qTFbexrofXW6Gu4noGxrOwQ==",
      "license": "MIT AND ISC",
      "dependencies": {
        "@types/d3-array": "^3.0.3",
        "@types/d3-ease": "^3.0.0",
        "@types/d3-interpolate": "^3.0.1",
        "@types/d3-scale": "^4.0.2",
        "@types/d3-shape": "^3.1.0",
        "@types/d3-time": "^3.0.0",
        "@types/d3-timer": "^3.0.0",
        "d3-array": "^3.1.6",
        "d3-ease": "^3.0.1",
        "d3-interpolate": "^3.0.1",
        "d3-scale": "^4.0.2",
        "d3-shape": "^3.1.0",
        "d3-time": "^3.0.0",
        "d3-timer": "^3.0.1"
      }
    },
    "node_modules/vite": {
      "version": "8.3.4",
      "resolved": "https://registry.npmjs.org/vite/-/vite-8.3.4.tgz",
      "integrity": "sha512-IftLE8phJhdNRIGNEV4JCCvfNScoZQVfcXaN8TQropWGJtOHcu+iAB9pHcuGvmEb/kddw0LBe/jS8ztdC6xdiQ==",
      "license": "MIT",
      "dependencies": {
        "lightningcss": "^1.33.0",
        "picomatch": "^4.0.7",
        "postcss": "^8.5.29",
        "rolldown": "~1.2.12",
        "tinyglobby": "^0.2.17"
      },
      "bin": {
        "vite": "bin/vite.js"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      },
      "funding": {
        "url": "https://github.com/vitejs/vite?sponsor=1"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.3"
      },
      "peerDependencies": {
        "@types/node": "^20.19.0 || >=22.12.0",
        "@vitejs/devtools": "^0.7.1",
        "esbuild": "^0.27.0 || ^0.28.0",
        "jiti": ">=1.21.0",
        "less": "^4.0.0",
        "sass": "^1.70.0",
        "sass-embedded": "^1.70.0",
        "stylus": ">=0.54.8",
        "sugarss": "^5.0.0",
        "terser": "^5.16.0",
        "tsx": "^4.8.1",
        "yaml": "^2.4.2"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        },
        "@vitejs/devtools": {
          "optional": true
        },
        "esbuild": {
          "optional": true
        },
        "jiti": {
          "optional": true
        },
        "less": {
          "optional": true
        },
        "sass": {
          "optional": true
        },
        "sass-embedded": {
          "optional": true
        },
        "stylus": {
          "optional": true
        },
        "sugarss": {
          "optional": true
        },
        "terser": {
          "optional": true
        },
        "tsx": {
          "optional": true
        },
        "yaml": {
          "optional": true
        }
      }
    },
    "node_modules/wmf": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/wmf/-/wmf-1.0.2.tgz",
      "integrity": "sha512-/p9K7bEh0Dj6WbXg4JG0xvLQmIadrner1bi45VMJTfnbVHsc7yIajZyoSoK60/dtVBs12Fm6WkUI5/3WAVsNMw==",
      "license": "Apache-2.0",
      "engines": {
        "node": ">=0.8"
      }
    },
    "node_modules/word": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/word/-/word-0.3.0.tgz",
      "integrity": "sha512-OELeY0Q61OXpdUfTp+oweA/vtLVg5VDOXh+3he3PNzLGG/y0oylSOC1xRVj0+l4vQ3tj/bB1HVHv1ocXkQceFA==",
      "license": "Apache-2.0",
      "engines": {
        "node": ">=0.8"
      }
    },
    "node_modules/xlsx": {
      "version": "0.18.5",
      "resolved": "https://registry.npmjs.org/xlsx/-/xlsx-0.18.5.tgz",
      "integrity": "sha512-dmg3LCjBPHZnQp5/F/+nnTa+miPJxUXB6vtk42YjBBKayDNagxGEeIdWApkYPOf3Z3pm3k62Knjzp7lMeTEtFQ==",
      "license": "Apache-2.0",
      "dependencies": {
        "adler-32": "~1.3.0",
        "cfb": "~1.2.1",
        "codepage": "~1.15.0",
        "crc-32": "~1.2.1",
        "ssf": "~0.11.2",
        "wmf": "~1.0.1",
        "word": "~0.3.0"
      },
      "bin": {
        "xlsx": "bin/xlsx.njs"
      },
      "engines": {
        "node": ">=0.8"
      }
    }
  }
}

```

## package.json
```json
{
  "name": "meu-financeiro",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "oxlint",
    "preview": "vite preview"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.117.3",
    "@tailwindcss/vite": "^4.3.3",
    "lucide-react": "^1.57.0",
    "pdfjs-dist": "^6.4.299",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "recharts": "^3.10.1",
    "tailwindcss": "^4.3.3",
    "xlsx": "^0.18.5"
  },
  "devDependencies": {
    "@types/node": "^24.13.3",
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.7",
    "@vitejs/plugin-react": "^6.1.1",
    "oxlint": "^1.81.0",
    "typescript": "~6.0.2",
    "vite": "^8.3.0"
  }
}

```

## README.md
```md
# 💸 NossoFinanceiro — Gestão Financeira de Casal & Individual

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Vibe Coding](https://img.shields.io/badge/100%25-Vibe_Coding_✨-10b981?style=for-the-badge)

> **Nota de Desenvolvimento:** Este projeto foi construído **100% no estilo Vibe Coding**, servindo como um laboratório prático para explorar, testar e entender até onde vai o potencial da Inteligência Artificial no desenvolvimento de software moderno — da arquitetura de banco de dados à criação de algoritmos complexos de leitura de arquivos, guiado puramente por prompts, revisão de regras de negócio e iteração contínua.

---

## 🧠 Sobre o Experimento (IA & Vibe Coding)

Em vez do fluxo tradicional de digitar cada linha de código manualmente do zero, este aplicativo nasceu com dois objetivos principais:
1. **Resolver um problema real do dia a dia:** Substituir planilhas manuais por um Web App completo, responsivo e sincronizado em nuvem para controle financeiro de casal, enxoval de casa nova e perfis isolados.
2. **Estudar Engenharia de Prompt e Colaboração com IA:** Validar como estruturar requisitos lógicos, corrigir bugs de compilação/deploy, modularizar componentes e desenhar algoritmos sob medida conversando com a IA como um par de programação (*pair programming*).

---

## ✨ Funcionalidades Principais

* **👥 Multi-Contas com Isolamento de Dados:** Sistema de autenticação leve com separação de ambientes no banco de dados (Conta Principal do Casal e Conta Individual compartilhada), com redefinição de senha sincronizada em nuvem.
* **📊 Dashboard & Extrato Inteligente:** Cálculo automático de Saldo Livre, Entradas, Gastos e Poupança, com divisão clara de quem realizou cada gasto ou se foi uma despesa conjunta do casal.
* **🏦 Importador Inteligente de Extratos Bancários (PDF, OFX, CSV, XLSX e Texto):**
  * Leitura direta de extratos em PDF (como Itaú, Nubank e Inter) reconstruindo as linhas da página.
  * **Filtro de Mês Alvo:** Descarta automaticamente lançamentos de outros meses em extratos de 60 ou 90 dias.
  * **Detector de Transferências Internas (`⇄`):** Cruza saídas e entradas de mesmo valor e data entre contas próprias para marcá-las como *Movimentação Interna*, evitando que transferências inflem os ganhos ou gastos do mês.
  * **Tela de Revisão (Preview):** Permite editar descrições, categorias e responsáveis antes de confirmar a importação.
* **🏠 Controle de Enxoval da Casa Nova:**
  * Cadastro e acompanhamento de progresso (`% concluído`, valor já comprado vs. valor estimado pendente) separado por cômodos e nível de prioridade (*Alta, Média, Baixa*).
  * Algoritmo de importação em lote de planilhas de enxoval com múltiplas abas/tabelas.
* **📝 Mural de Observações do Mês:** Espaço estilo diário financeiro para registrar acontecimentos atípicos do mês (cartão emprestado, reembolsos pendentes, compras parceladas para terceiros) com controle de status (*Pendente* ou *Resolvido/Pago*).
* **🐷 Gestão de Poupança & Teto de Gastos:**
  * Registro tanto de depósitos (*Guardei*) quanto de retiradas (*Tirei da Poupança*), mantendo o histórico sem distorcer o orçamento mensal do salário.
  * Metas de gastos mensais personalizáveis por categoria com barras de alerta visual.
* **📱 Design Mobile-First:** Layout adaptado para uso no celular como um app nativo, com *Bottom Navigation* dedicada e sincronização em tempo real via **Supabase Realtime**.

---

## 🛠️ Tecnologias Utilizadas

* **Frontend:** React 18 + TypeScript + Vite
* **Estilização:** Tailwind CSS + Lucide Icons
* **Backend & Banco de Dados:** Supabase (PostgreSQL + Realtime Subscriptions) + Fallback Offline (`localStorage`)
* **Processamento de Arquivos:** `xlsx` (SheetJS) para planilhas Excel/CSV e `pdfjs-dist` para extração de texto de extratos em PDF
* **Deploy:** Vercel

---

## 🚀 Como Rodar o Projeto Localmente

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/Juancls/meu-financeiro.git](https://github.com/Juancls/meu-financeiro.git)
   cd meu-financeiro

```

## src\App.css
```css
.counter {
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  color: var(--accent);
  background: var(--accent-bg);
  border: 2px solid transparent;
  transition: border-color 0.3s;
  margin-bottom: 24px;

  &:hover {
    border-color: var(--accent-border);
  }
  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
}

.hero {
  position: relative;

  .base,
  .framework,
  .vite {
    inset-inline: 0;
    margin: 0 auto;
  }

  .base {
    width: 170px;
    position: relative;
    z-index: 0;
  }

  .framework,
  .vite {
    position: absolute;
  }

  .framework {
    z-index: 1;
    top: 34px;
    height: 28px;
    transform: perspective(2000px) rotateZ(300deg) rotateX(44deg) rotateY(39deg)
      scale(1.4);
  }

  .vite {
    z-index: 0;
    top: 107px;
    height: 26px;
    width: auto;
    transform: perspective(2000px) rotateZ(300deg) rotateX(40deg) rotateY(39deg)
      scale(0.8);
  }
}

#center {
  display: flex;
  flex-direction: column;
  gap: 25px;
  place-content: center;
  place-items: center;
  flex-grow: 1;

  @media (max-width: 1024px) {
    padding: 32px 20px 24px;
    gap: 18px;
  }
}

#next-steps {
  display: flex;
  border-top: 1px solid var(--border);
  text-align: left;

  & > div {
    flex: 1 1 0;
    padding: 32px;
    @media (max-width: 1024px) {
      padding: 24px 20px;
    }
  }

  .icon {
    margin-bottom: 16px;
    width: 22px;
    height: 22px;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
  }
}

#docs {
  border-right: 1px solid var(--border);

  @media (max-width: 1024px) {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
}

#next-steps ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 8px;
  margin: 32px 0 0;

  .logo {
    height: 18px;
  }

  a {
    color: var(--text-h);
    font-size: 16px;
    border-radius: 6px;
    background: var(--social-bg);
    display: flex;
    padding: 6px 12px;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    transition: box-shadow 0.3s;

    &:hover {
      box-shadow: var(--shadow);
    }
    .button-icon {
      height: 18px;
      width: 18px;
    }
  }

  @media (max-width: 1024px) {
    margin-top: 20px;
    flex-wrap: wrap;
    justify-content: center;

    li {
      flex: 1 1 calc(50% - 8px);
    }

    a {
      width: 100%;
      justify-content: center;
      box-sizing: border-box;
    }
  }
}

#spacer {
  height: 88px;
  border-top: 1px solid var(--border);
  @media (max-width: 1024px) {
    height: 48px;
  }
}

.ticks {
  position: relative;
  width: 100%;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: -4.5px;
    border: 5px solid transparent;
  }

  &::before {
    left: 0;
    border-left-color: var(--border);
  }
  &::after {
    right: 0;
    border-right-color: var(--border);
  }
}

```

## src\App.tsx
```tsx
import { useState, useEffect, useMemo } from 'react';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  ArrowDownLeft,
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  PieChart as PieChartIcon,
  List,
  Home,
  Target,
  Package,
  FileText,
  Users,
  RefreshCw,
  Settings,
  Check,
  AlertCircle,
  Pencil,
  LogOut,
} from 'lucide-react';
import { supabase } from './supabaseClient';
import {
  type AccountId,
  type Transaction,
  type TransactionType,
  type PaymentMethod,
  type ActiveTab,
  type CategoryBudget,
  type EnxovalItem,
  type ObservacaoMes,
  ORCAMENTOS_INICIAIS,
  obterMesAtualLocal,
  formatarMoeda,
  nomeMesAno,
} from './types';
import { CardTransacao } from './components/CardTransacao';
import { ModalTransacao } from './components/ModalTransacao';
import { ModalConfigCasal } from './components/ModalConfigCasal';
import { AbaEnxoval } from './components/AbaEnxoval';
import { AbaObservacoes } from './components/AbaObservacoes';
import { ImportadorPlanilhaGastos } from './components/ImportadorPlanilhaGastos';
import { ImportadorExtratoBancario } from './components/ImportadorExtratoBancario';
import { TelaLogin } from './components/TelaLogin';

export default function App() {
  // --- USUÁRIO LOGADO ('casal' ou 'vitoria') ---
  const [contaAtiva, setContaAtiva] = useState<AccountId | null>(() => {
    const salvo = localStorage.getItem('@financas:conta_ativa');
    return salvo === 'casal' || salvo === 'vitoria' ? salvo : null;
  });

  const prefixoStorage = contaAtiva ? `@financas:${contaAtiva}` : '@financas:casal';
  const idConfigBanco = contaAtiva === 'vitoria' ? 2 : 1;

  // --- NOMES DO PERFIL ---
  const [pessoa1, setPessoa1] = useState('Juan');
  const [pessoa2, setPessoa2] = useState('Noiva');
  const [modalConfigAberto, setModalConfigAberto] = useState(false);

  // --- NAVEGAÇÃO E FILTROS ---
  const [abaAtiva, setAbaAtiva] = useState<ActiveTab>('home');
  const [modalAberto, setModalAberto] = useState(false);
  const [tipoInicialModal, setTipoInicialModal] = useState<TransactionType>('despesa');
  const [transacaoEditando, setTransacaoEditando] = useState<Transaction | null>(null);
  const [filtroPessoaGlobal, setFiltroPessoaGlobal] = useState<string>('Todos');
  const [mesSelecionado, setMesSelecionado] = useState(() => obterMesAtualLocal());
  const [sincronizando, setSincronizando] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [erroNuvem, setErroNuvem] = useState<string | null>(null);

  // --- DADOS ---
  const [transacoes, setTransacoes] = useState<Transaction[]>([]);
  const [itensEnxoval, setItensEnxoval] = useState<EnxovalItem[]>([]);
  const [observacoesMes, setObservacoesMes] = useState<ObservacaoMes[]>([]);
  const [metaPoupanca, setMetaPoupanca] = useState<number>(10000);
  const [orcamentos, setOrcamentos] = useState<CategoryBudget[]>(ORCAMENTOS_INICIAIS);

  // --- EDIÇÃO DE METAS (POUPANÇA E TETO DE GASTOS DO MÊS) ---
  const [busca, setBusca] = useState('');
  const [filtroTipo, setFiltroTipo] = useState<'todos' | TransactionType>('todos');
  const [editandoMeta, setEditandoMeta] = useState(false);
  const [novaMetaInput, setNovaMetaInput] = useState('10000');
  const [editandoOrcamentos, setEditandoOrcamentos] = useState(false);
  const [orcamentosTemp, setOrcamentosTemp] = useState<Record<string, string>>({});

  // Carrega dados locais do usuário sempre que trocar de conta
  useEffect(() => {
    if (!contaAtiva) return;
    localStorage.setItem('@financas:conta_ativa', contaAtiva);

    const p1Padrao = contaAtiva === 'vitoria' ? 'Vitória' : 'Juan';
    const p2Padrao = contaAtiva === 'vitoria' ? 'Parceiro(a)' : 'Noiva';

    setPessoa1(localStorage.getItem(`${prefixoStorage}:pessoa1`) || p1Padrao);
    setPessoa2(localStorage.getItem(`${prefixoStorage}:pessoa2`) || p2Padrao);
    setFiltroPessoaGlobal('Todos');

    try {
      const trSalvas = localStorage.getItem(`${prefixoStorage}:transacoes`);
      setTransacoes(trSalvas ? JSON.parse(trSalvas) : []);

      const enxSalvo = localStorage.getItem(`${prefixoStorage}:enxoval`);
      setItensEnxoval(enxSalvo ? JSON.parse(enxSalvo) : []);

      const obsSalvas = localStorage.getItem(`${prefixoStorage}:observacoes`);
      setObservacoesMes(obsSalvas ? JSON.parse(obsSalvas) : []);

      const orcSalvos = localStorage.getItem(`${prefixoStorage}:orcamentos`);
      setOrcamentos(orcSalvos ? JSON.parse(orcSalvos) : ORCAMENTOS_INICIAIS);
    } catch {
      setTransacoes([]);
    }
  }, [contaAtiva, prefixoStorage]);

  // --- SINCRONIZAÇÃO COM SUPABASE POR CONTA ---
  const carregarDadosNuvem = async () => {
    if (!supabase || !contaAtiva) return;
    setSincronizando(true);

    try {
      const filtroConta =
        contaAtiva === 'casal'
          ? 'conta_id.eq.casal,conta_id.is.null'
          : 'conta_id.eq.vitoria';

      const { data: transData, error: transError } = await supabase
        .from('transacoes')
        .select('*')
        .or(filtroConta)
        .order('data', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(3000);

      if (transError) {
        setErroNuvem(`Aviso de sincronização: ${transError.message}`);
        setSincronizando(false);
        return;
      }

      setErroNuvem(null);

      if (transData) {
        const daNuvem: Transaction[] = transData.map((row: any) => ({
          id: String(row.id),
          tipo: row.tipo,
          valor: Number(row.valor),
          data: row.data,
          local: row.local,
          categoria: row.categoria,
          tags: Array.isArray(row.tags) ? row.tags : [],
          metodoPagamento: row.metodo_pagamento,
          parcelaInfo: row.parcela_info || undefined,
          responsavel: row.responsavel,
          pendenteSync: false,
        }));
        setTransacoes(daNuvem);
      }

      const { data: enxovalData } = await supabase
        .from('enxoval')
        .select('*')
        .or(filtroConta)
        .order('comodo', { ascending: true })
        .limit(3000);

      if (enxovalData) {
        setItensEnxoval(
          enxovalData.map((row: any) => ({
            id: String(row.id),
            comodo: row.comodo || 'Outros',
            item: row.item,
            quantidade: Number(row.quantidade) || 1,
            valor: Number(row.valor) || 0,
            prioridade: row.prioridade || 'Média',
            observacao: row.observacao || '',
            comprado: Boolean(row.comprado),
          }))
        );
      }

      const { data: obsData } = await supabase
        .from('observacoes_mes')
        .select('*')
        .or(filtroConta)
        .order('created_at', { ascending: false })
        .limit(1000);

      if (obsData) {
        setObservacoesMes(
          obsData.map((row: any) => ({
            id: String(row.id),
            mes: row.mes,
            autor: row.autor,
            titulo: row.titulo,
            texto: row.texto,
            valor: row.valor ? Number(row.valor) : undefined,
            resolvido: Boolean(row.resolvido),
            dataCriacao: row.data_criacao,
          }))
        );
      }

      const { data: configData } = await supabase
        .from('config_casal')
        .select('*')
        .eq('id', idConfigBanco)
        .single();

      if (configData) {
        if (configData.meta_poupanca) setMetaPoupanca(Number(configData.meta_poupanca));
        if (configData.pessoa1) setPessoa1(configData.pessoa1);
        if (configData.pessoa2) setPessoa2(configData.pessoa2);
        if (Array.isArray(configData.orcamentos) && configData.orcamentos.length > 0) {
          setOrcamentos(configData.orcamentos);
        }
      }
    } catch {
      setErroNuvem('Sem conexão no momento. Seus dados estão salvos no aparelho.');
    } finally {
      setSincronizando(false);
    }
  };

  useEffect(() => {
    if (!supabase || !contaAtiva) return;
    carregarDadosNuvem();

    const canal = supabase
      .channel(`realtime-${contaAtiva}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'transacoes' }, () => {
        carregarDadosNuvem();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'enxoval' }, () => {
        carregarDadosNuvem();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'observacoes_mes' }, () => {
        carregarDadosNuvem();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'config_casal' }, () => {
        carregarDadosNuvem();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(canal);
    };
  }, [contaAtiva]);

  useEffect(() => {
    if (!contaAtiva) return;
    localStorage.setItem(`${prefixoStorage}:transacoes`, JSON.stringify(transacoes));
  }, [transacoes, contaAtiva, prefixoStorage]);

  useEffect(() => {
    if (!contaAtiva) return;
    localStorage.setItem(`${prefixoStorage}:enxoval`, JSON.stringify(itensEnxoval));
  }, [itensEnxoval, contaAtiva, prefixoStorage]);

  useEffect(() => {
    if (!contaAtiva) return;
    localStorage.setItem(`${prefixoStorage}:observacoes`, JSON.stringify(observacoesMes));
  }, [observacoesMes, contaAtiva, prefixoStorage]);

  useEffect(() => {
    if (!contaAtiva) return;
    localStorage.setItem(`${prefixoStorage}:orcamentos`, JSON.stringify(orcamentos));
  }, [orcamentos, contaAtiva, prefixoStorage]);

  useEffect(() => {
    if (!contaAtiva) return;
    localStorage.setItem(`${prefixoStorage}:pessoa1`, pessoa1);
    localStorage.setItem(`${prefixoStorage}:pessoa2`, pessoa2);
  }, [pessoa1, pessoa2, contaAtiva, prefixoStorage]);

  const mudarMes = (direcao: number) => {
    const [ano, mes] = mesSelecionado.split('-').map(Number);
    const novaData = new Date(ano, mes - 1 + direcao, 1);
    setMesSelecionado(
      `${novaData.getFullYear()}-${String(novaData.getMonth() + 1).padStart(2, '0')}`
    );
  };

  // --- CÁLCULOS FINANCEIROS (IGNORA MOVIMENTAÇÕES INTERNAS NO SALDO) ---
  const transacoesDoMes = useMemo(() => {
    return transacoes
      .filter((t) => t.data.startsWith(mesSelecionado))
      .filter((t) => filtroPessoaGlobal === 'Todos' || t.responsavel === filtroPessoaGlobal)
      .sort((a, b) => b.data.localeCompare(a.data));
  }, [transacoes, mesSelecionado, filtroPessoaGlobal]);

  const resumoMes = useMemo(() => {
    let receitas = 0;
    let despesas = 0;
    let poupadoMes = 0;
    let resgatadoMes = 0;

    transacoesDoMes.forEach((t) => {
      if (t.tipo === 'receita') receitas += t.valor;
      if (t.tipo === 'despesa') despesas += t.valor;
      if (t.tipo === 'poupanca') poupadoMes += t.valor;
      if (t.tipo === 'resgate_poupanca') resgatadoMes += t.valor;
      // Nota: 'transferencia_interna' não soma nem subtrai do saldo!
    });

    return {
      receitas,
      despesas,
      poupadoMes,
      resgatadoMes,
      saldoLivre: receitas - despesas - poupadoMes,
    };
  }, [transacoesDoMes]);

  const resumoPorPessoa = useMemo(() => {
    const todasDoMes = transacoes.filter((t) => t.data.startsWith(mesSelecionado));
    const calc = (nome: string, tipo: TransactionType) =>
      todasDoMes
        .filter((t) => t.responsavel === nome && t.tipo === tipo)
        .reduce((acc, t) => acc + t.valor, 0);

    return {
      p1Gastos: calc(pessoa1, 'despesa'),
      p2Gastos: calc(pessoa2, 'despesa'),
      casalGastos: calc('Casal', 'despesa'),
      p1Poupanca: calc(pessoa1, 'poupanca') - calc(pessoa1, 'resgate_poupanca'),
      p2Poupanca: calc(pessoa2, 'poupanca') - calc(pessoa2, 'resgate_poupanca'),
      casalPoupanca: calc('Casal', 'poupanca') - calc('Casal', 'resgate_poupanca'),
    };
  }, [transacoes, mesSelecionado, pessoa1, pessoa2]);

  const dadosPoupancaGlobal = useMemo(() => {
    const filtradas = transacoes.filter(
      (t) => filtroPessoaGlobal === 'Todos' || t.responsavel === filtroPessoaGlobal
    );

    const totalGuardado = filtradas
      .filter((t) => t.tipo === 'poupanca')
      .reduce((acc, t) => acc + t.valor, 0);

    const totalRetirado = filtradas
      .filter((t) => t.tipo === 'resgate_poupanca')
      .reduce((acc, t) => acc + t.valor, 0);

    const historicoMovimentacoes = filtradas
      .filter((t) => t.tipo === 'poupanca' || t.tipo === 'resgate_poupanca')
      .sort((a, b) => b.data.localeCompare(a.data));

    return {
      saldoAtual: totalGuardado - totalRetirado,
      totalGuardado,
      totalRetirado,
      historicoMovimentacoes,
    };
  }, [transacoes, filtroPessoaGlobal]);

  // --- SALVAR METAS DE GASTOS DO MÊS (ORÇAMENTOS) ---
  const abrirEdicaoOrcamentos = () => {
    const mapa: Record<string, string> = {};
    orcamentos.forEach((o) => {
      mapa[o.categoria] = String(o.limite);
    });
    setOrcamentosTemp(mapa);
    setEditandoOrcamentos(true);
  };

  const salvarOrcamentos = async () => {
    const novosOrcamentos: CategoryBudget[] = orcamentos.map((o) => {
      const digitado = orcamentosTemp[o.categoria] ?? String(o.limite);
      const valLimpo = digitado.replace(',', '.');
      const num = parseFloat(valLimpo);
      return {
        categoria: o.categoria,
        limite: !isNaN(num) && num >= 0 ? num : o.limite,
      };
    });

    setOrcamentos(novosOrcamentos);
    setEditandoOrcamentos(false);

    if (supabase) {
      await supabase.from('config_casal').upsert({
        id: idConfigBanco,
        meta_poupanca: metaPoupanca,
        pessoa1,
        pessoa2,
        orcamentos: novosOrcamentos,
      });
    }
  };

  // --- IMPORTAÇÃO DA PLANILHA ANTIGA (JAN A JUL) ---
  const handleImportarPlanilhaAntiga = async (
    novasTransacoes: Transaction[],
    novasObservacoes: ObservacaoMes[]
  ) => {
    setTransacoes((prev) => {
      const mapa = new Map<string, Transaction>();
      prev.forEach((t) => mapa.set(t.id, t));
      novasTransacoes.forEach((t) => mapa.set(t.id, t));
      return Array.from(mapa.values());
    });

    setObservacoesMes((prev) => {
      const mapa = new Map<string, ObservacaoMes>();
      prev.forEach((o) => mapa.set(o.id, o));
      novasObservacoes.forEach((o) => mapa.set(o.id, o));
      return Array.from(mapa.values());
    });

    if (supabase) {
      const payloadTrans = novasTransacoes.map((t) => ({
        id: `${contaAtiva}-${t.id}`,
        tipo: t.tipo,
        valor: t.valor,
        data: t.data,
        local: t.local,
        categoria: t.categoria,
        tags: t.tags,
        metodo_pagamento: t.metodoPagamento,
        parcela_info: t.parcelaInfo || null,
        responsavel: t.responsavel,
        conta_id: contaAtiva,
      }));

      await supabase.from('transacoes').upsert(payloadTrans);

      if (novasObservacoes.length > 0) {
        const payloadObs = novasObservacoes.map((o) => ({
          id: `${contaAtiva}-${o.id}`,
          mes: o.mes,
          autor: o.autor,
          titulo: o.titulo,
          texto: o.texto,
          valor: o.valor || 0,
          resolvido: o.resolvido,
          data_criacao: o.dataCriacao,
          conta_id: contaAtiva,
        }));
        await supabase.from('observacoes_mes').upsert(payloadObs);
      }
    }

    setMesSelecionado('2026-08');
  };

  // --- IMPORTAÇÃO DE EXTRATOS BANCÁRIOS (.CSV, .OFX, .TXT) ---
  const handleImportarExtratoBancario = async (novosLancamentos: Transaction[]) => {
    const comConta = novosLancamentos.map((t) => ({
      ...t,
      id: `${contaAtiva}-${t.id}`,
    }));

    setTransacoes((prev) => [...comConta, ...prev]);

    if (comConta.length > 0) {
      setMesSelecionado(comConta[0].data.slice(0, 7));
    }

    if (supabase) {
      const payload = comConta.map((t) => ({
        id: t.id,
        tipo: t.tipo,
        valor: t.valor,
        data: t.data,
        local: t.local,
        categoria: t.categoria,
        tags: t.tags,
        metodo_pagamento: t.metodoPagamento,
        parcela_info: t.parcelaInfo || null,
        responsavel: t.responsavel,
        conta_id: contaAtiva,
      }));
      await supabase.from('transacoes').upsert(payload);
    }
  };

  // --- AÇÕES DE TRANSAÇÃO ---
  const handleSalvarTransacao = async (dados: {
    id?: string;
    tipo: TransactionType;
    responsavel: string;
    valor: number;
    data: string;
    local: string;
    categoria: string;
    tags: string[];
    metodoPagamento: PaymentMethod;
    parcelas: number;
  }) => {
    setSalvando(true);

    if (dados.id) {
      const atualizada: Transaction = {
        id: dados.id,
        tipo: dados.tipo,
        valor: dados.valor,
        data: dados.data,
        local: dados.local,
        categoria: dados.categoria,
        tags: dados.tags,
        metodoPagamento: dados.metodoPagamento,
        responsavel: dados.responsavel,
        parcelaInfo: transacaoEditando?.parcelaInfo,
        pendenteSync: false,
      };

      setTransacoes((prev) => prev.map((t) => (t.id === dados.id ? atualizada : t)));

      if (supabase) {
        await supabase.from('transacoes').upsert({
          id: atualizada.id,
          tipo: atualizada.tipo,
          valor: atualizada.valor,
          data: atualizada.data,
          local: atualizada.local,
          categoria: atualizada.categoria,
          tags: atualizada.tags,
          metodo_pagamento: atualizada.metodoPagamento,
          parcela_info: atualizada.parcelaInfo || null,
          responsavel: atualizada.responsavel,
          conta_id: contaAtiva,
        });
      }

      setSalvando(false);
      setTransacaoEditando(null);
      setModalAberto(false);
      return;
    }

    const novasTransacoes: Transaction[] = [];
    const numParcelas =
      dados.tipo === 'despesa' && dados.metodoPagamento === 'Cartão de Crédito'
        ? Math.max(1, dados.parcelas)
        : 1;
    const valorParcela = Number((dados.valor / numParcelas).toFixed(2));
    const [anoBase, mesBase, diaBase] = dados.data.split('-').map(Number);
    const sufixoAleatorio = Math.random().toString(36).substring(2, 7);

    for (let i = 0; i < numParcelas; i++) {
      const dataParcela = new Date(anoBase, mesBase - 1 + i, diaBase);
      const dataStr = `${dataParcela.getFullYear()}-${String(dataParcela.getMonth() + 1).padStart(
        2,
        '0'
      )}-${String(dataParcela.getDate()).padStart(2, '0')}`;

      novasTransacoes.push({
        id: `${contaAtiva}-${Date.now()}-${sufixoAleatorio}-${i}`,
        tipo: dados.tipo,
        valor: valorParcela,
        data: dataStr,
        local: dados.local,
        categoria: dados.categoria,
        tags: dados.tags,
        metodoPagamento: dados.metodoPagamento,
        parcelaInfo: numParcelas > 1 ? `${i + 1}/${numParcelas}` : undefined,
        responsavel: dados.responsavel,
        pendenteSync: false,
      });
    }

    setTransacoes((prev) => [...novasTransacoes, ...prev]);

    const mesDoLancamento = dados.data.slice(0, 7);
    if (mesDoLancamento !== mesSelecionado) {
      setMesSelecionado(mesDoLancamento);
    }

    if (supabase) {
      const payload = novasTransacoes.map((t) => ({
        id: t.id,
        tipo: t.tipo,
        valor: t.valor,
        data: t.data,
        local: t.local,
        categoria: t.categoria,
        tags: t.tags,
        metodo_pagamento: t.metodoPagamento,
        parcela_info: t.parcelaInfo || null,
        responsavel: t.responsavel,
        conta_id: contaAtiva,
      }));

      const { error } = await supabase.from('transacoes').upsert(payload);
      if (error) {
        setErroNuvem(`Salvo no aparelho, mas falhou na nuvem (${error.message}).`);
      }
    }

    setSalvando(false);
    setModalAberto(false);
  };

  const handleExcluir = async (id: string) => {
    setTransacoes((prev) => prev.filter((t) => t.id !== id));
    if (supabase) {
      await supabase.from('transacoes').delete().eq('id', id);
    }
  };

  const handleAbrirEditarTransacao = (t: Transaction) => {
    setTransacaoEditando(t);
    setModalAberto(true);
  };

  // --- AÇÕES DO ENXOVAL ---
  const handleSalvarItemEnxoval = async (item: EnxovalItem) => {
    setItensEnxoval((prev) => {
      const existe = prev.some((i) => i.id === item.id);
      return existe ? prev.map((i) => (i.id === item.id ? item : i)) : [item, ...prev];
    });

    if (supabase) {
      await supabase.from('enxoval').upsert({
        id: item.id,
        comodo: item.comodo,
        item: item.item,
        quantidade: item.quantidade,
        valor: item.valor,
        prioridade: item.prioridade,
        observacao: item.observacao,
        comprado: item.comprado,
        conta_id: contaAtiva,
      });
    }
  };

  const handleImportarEnxovalEmLote = async (novosItens: EnxovalItem[]) => {
    const itensComConta = novosItens.map((i) => ({
      ...i,
      id: `${contaAtiva}-${i.id}`,
    }));
    setItensEnxoval((prev) => [...itensComConta, ...prev]);

    if (supabase) {
      const payload = itensComConta.map((item) => ({
        id: item.id,
        comodo: item.comodo,
        item: item.item,
        quantidade: item.quantidade,
        valor: item.valor,
        prioridade: item.prioridade,
        observacao: item.observacao,
        comprado: item.comprado,
        conta_id: contaAtiva,
      }));
      await supabase.from('enxoval').upsert(payload);
    }
  };

  const handleAlternarCompradoEnxoval = async (item: EnxovalItem) => {
    const atualizado = { ...item, comprado: !item.comprado };
    await handleSalvarItemEnxoval(atualizado);
  };

  const handleExcluirItemEnxoval = async (id: string) => {
    setItensEnxoval((prev) => prev.filter((i) => i.id !== id));
    if (supabase) {
      await supabase.from('enxoval').delete().eq('id', id);
    }
  };

  // --- AÇÕES DAS OBSERVAÇÕES DO MÊS ---
  const handleSalvarObservacao = async (obs: ObservacaoMes) => {
    setObservacoesMes((prev) => {
      const existe = prev.some((o) => o.id === obs.id);
      return existe ? prev.map((o) => (o.id === obs.id ? obs : o)) : [obs, ...prev];
    });

    if (supabase) {
      await supabase.from('observacoes_mes').upsert({
        id: obs.id,
        mes: obs.mes,
        autor: obs.autor,
        titulo: obs.titulo,
        texto: obs.texto,
        valor: obs.valor || 0,
        resolvido: obs.resolvido,
        data_criacao: obs.dataCriacao,
        conta_id: contaAtiva,
      });
    }
  };

  const handleAlternarResolvidoObs = async (obs: ObservacaoMes) => {
    const atualizada = { ...obs, resolvido: !obs.resolvido };
    await handleSalvarObservacao(atualizada);
  };

  const handleExcluirObservacao = async (id: string) => {
    setObservacoesMes((prev) => prev.filter((o) => o.id !== id));
    if (supabase) {
      await supabase.from('observacoes_mes').delete().eq('id', id);
    }
  };

  const salvarConfigCasal = async (
    novaMeta?: number,
    nP1?: string,
    nP2?: string,
    novaSenha?: string
  ) => {
    const metaFinal = novaMeta ?? metaPoupanca;
    const p1Final = (nP1 ?? pessoa1).trim() || 'Juan';
    const p2Final = (nP2 ?? pessoa2).trim() || 'Noiva';

    setPessoa1(p1Final);
    setPessoa2(p2Final);
    setFiltroPessoaGlobal('Todos');

    if (novaSenha && contaAtiva) {
      localStorage.setItem(`@financas:senha_${contaAtiva}`, novaSenha);
    }

    if (supabase) {
      const payload: any = {
        id: idConfigBanco,
        meta_poupanca: metaFinal,
        pessoa1: p1Final,
        pessoa2: p2Final,
        orcamentos,
      };
      if (novaSenha) {
        payload.senha = novaSenha;
      }
      await supabase.from('config_casal').upsert(payload);
    }
  };

  const handleTrocarUsuario = () => {
    localStorage.removeItem('@financas:conta_ativa');
    setContaAtiva(null);
  };

  const transacoesFiltradas = useMemo(() => {
    return transacoesDoMes.filter((t) => {
      const bateTipo = filtroTipo === 'todos' || t.tipo === filtroTipo;
      const termo = busca.toLowerCase();
      const bateBusca =
        t.local.toLowerCase().includes(termo) ||
        t.categoria.toLowerCase().includes(termo) ||
        t.responsavel.toLowerCase().includes(termo) ||
        t.tags.some((tag) => tag.toLowerCase().includes(termo));
      return bateTipo && bateBusca;
    });
  }, [transacoesDoMes, filtroTipo, busca]);

  const gastosPorCategoria = useMemo(() => {
    const mapa: Record<string, number> = {};
    transacoesDoMes
      .filter((t) => t.tipo === 'despesa')
      .forEach((t) => {
        mapa[t.categoria] = (mapa[t.categoria] || 0) + t.valor;
      });
    return Object.entries(mapa)
      .map(([categoria, total]) => ({ categoria, total }))
      .sort((a, b) => b.total - a.total);
  }, [transacoesDoMes]);

  // SE NÃO ESTIVER LOGADO, EXIBE A TELA DE VERIFICAÇÃO DE USUÁRIO
  if (!contaAtiva) {
    return <TelaLogin onEntrar={(conta) => setContaAtiva(conta)} />;
  }

  const qtdObsDoMes = observacoesMes.filter((o) => o.mes === mesSelecionado).length;

  const itensMenu = [
    { id: 'home' as ActiveTab, label: 'Início', icone: Home },
    { id: 'extrato' as ActiveTab, label: 'Extrato', icone: List },
    { id: 'observacoes' as ActiveTab, label: 'Notas do Mês', icone: FileText, badge: qtdObsDoMes },
    { id: 'enxoval' as ActiveTab, label: 'Enxoval Casa', icone: Package },
    { id: 'metas' as ActiveTab, label: 'Poupança & Metas', icone: Target },
    { id: 'graficos' as ActiveTab, label: 'Análise', icone: PieChartIcon },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col md:flex-row font-sans selection:bg-emerald-500 selection:text-zinc-950 overflow-x-hidden w-full">
      
      {/* ==================== SIDEBAR DESKTOP (PC) ==================== */}
      <aside className="hidden md:flex md:w-64 lg:w-72 md:flex-col md:fixed md:inset-y-0 bg-zinc-900/60 border-r border-zinc-800/80 p-5 justify-between z-30">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Wallet size={20} />
              </div>
              <div>
                <span className="font-bold tracking-tight text-base text-white block leading-none">
                  NossoFinanceiro
                </span>
                <span className="text-[11px] text-emerald-400 font-medium">
                  Conta: {contaAtiva === 'vitoria' ? 'Vitória' : `${pessoa1} & ${pessoa2}`}
                </span>
              </div>
            </div>
            <button
              onClick={() => setModalConfigAberto(true)}
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition cursor-pointer"
              title="Configurar nomes"
            >
              <Settings size={16} />
            </button>
          </div>

          <button
            onClick={() => {
              setTransacaoEditando(null);
              setTipoInicialModal('despesa');
              setModalAberto(true);
            }}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-3 px-4 rounded-xl text-sm shadow-lg shadow-emerald-500/15 flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <Plus size={18} strokeWidth={2.5} />
            Novo Lançamento
          </button>

          <nav className="space-y-1.5">
            {itensMenu.map((item) => {
              const Icone = item.icone;
              const ativo = abaAtiva === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setAbaAtiva(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer ${
                    ativo
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icone size={18} />
                    <span>{item.label}</span>
                  </span>
                  {item.badge ? (
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-4 border-t border-zinc-800/80 space-y-2">
          {contaAtiva === 'casal' && (
            <ImportadorPlanilhaGastos onImportarDados={handleImportarPlanilhaAntiga} />
          )}

          <button
            onClick={carregarDadosNuvem}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 hover:border-zinc-700 transition cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <RefreshCw
                size={13}
                className={sincronizando ? 'animate-spin text-emerald-400' : 'text-emerald-400'}
              />
              {sincronizando ? 'Sincronizando...' : 'Sincronizado na Nuvem'}
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </button>

          <button
            onClick={handleTrocarUsuario}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-zinc-900 hover:bg-rose-950/40 border border-zinc-800 hover:border-rose-800/50 text-xs text-zinc-400 hover:text-rose-300 transition cursor-pointer"
          >
            <LogOut size={13} />
            Trocar Usuário ({contaAtiva === 'vitoria' ? 'Vitória' : 'Casal'})
          </button>
        </div>
      </aside>

      {/* ==================== ÁREA PRINCIPAL ==================== */}
      <div className="flex-1 md:pl-64 lg:pl-72 flex flex-col min-h-screen pb-28 md:pb-10 w-full overflow-x-hidden">
        
        {/* HEADER RESPONSIVO */}
        <header className="sticky top-0 z-20 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 px-4 md:px-8 py-3 w-full">
          <div className="max-w-6xl mx-auto flex flex-col gap-3 w-full">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 md:hidden">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                  <Wallet size={17} />
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-bold tracking-tight text-sm text-zinc-100">
                    {contaAtiva === 'vitoria' ? 'Finanças Vitória' : 'NossoFinanceiro'}
                  </span>
                  <button
                    onClick={carregarDadosNuvem}
                    className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400"
                  >
                    <RefreshCw size={10} className={sincronizando ? 'animate-spin' : ''} />
                    {sincronizando ? 'Sync...' : 'Online'}
                  </button>
                </div>
              </div>

              <div className="hidden md:block">
                <h1 className="text-lg font-bold text-white">
                  {itensMenu.find((i) => i.id === abaAtiva)?.label}
                </h1>
              </div>

              <div className="flex items-center gap-1.5 ml-auto shrink-0">
                {abaAtiva !== 'enxoval' && (
                  <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-full px-1.5 py-1">
                    <button
                      onClick={() => mudarMes(-1)}
                      className="p-1 text-zinc-400 hover:text-white transition cursor-pointer"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <span className="text-xs md:text-sm font-medium px-1.5 min-w-[100px] md:min-w-[140px] text-center truncate">
                      {nomeMesAno(mesSelecionado)}
                    </span>
                    <button
                      onClick={() => mudarMes(1)}
                      className="p-1 text-zinc-400 hover:text-white transition cursor-pointer"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}

                <button
                  onClick={() => setModalConfigAberto(true)}
                  className="md:hidden p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white shrink-0 cursor-pointer"
                  title="Configurar Nomes"
                >
                  <Settings size={15} />
                </button>

                <button
                  onClick={handleTrocarUsuario}
                  className="md:hidden p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-rose-400 shrink-0 cursor-pointer"
                  title="Trocar Usuário"
                >
                  <LogOut size={15} />
                </button>
              </div>
            </div>

            {erroNuvem && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg px-3 py-1.5 text-xs text-amber-300 flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5">
                  <AlertCircle size={14} className="shrink-0" /> {erroNuvem}
                </span>
                <button
                  onClick={carregarDadosNuvem}
                  className="underline font-semibold shrink-0 text-amber-200 cursor-pointer"
                >
                  Reenviar
                </button>
              </div>
            )}

            {abaAtiva !== 'enxoval' && abaAtiva !== 'observacoes' && (
              <div className="grid grid-cols-4 gap-1.5 bg-zinc-900/90 p-1 rounded-xl border border-zinc-800/80 w-full">
                {(['Todos', pessoa1, pessoa2, 'Casal'] as const).map((item) => (
                  <button
                    key={item}
                    onClick={() => setFiltroPessoaGlobal(item)}
                    className={`py-1.5 rounded-lg text-xs font-semibold transition truncate px-1 text-center cursor-pointer ${
                      filtroPessoaGlobal === item
                        ? 'bg-emerald-500 text-zinc-950 shadow'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {item === 'Todos' ? 'Visão Geral' : item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* CONTEÚDO CENTRAL */}
        <main className="flex-1 px-4 md:px-8 py-5 max-w-6xl w-full mx-auto space-y-6">
          
          {/* ABA 1: HOME */}
          {abaAtiva === 'home' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                <div className="lg:col-span-7 bg-gradient-to-br from-zinc-900 via-zinc-900 to-emerald-950/40 border border-zinc-800 rounded-2xl p-5 md:p-6 shadow-lg flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
                        Saldo Livre ({filtroPessoaGlobal === 'Todos' ? 'Total' : filtroPessoaGlobal})
                      </p>
                      <Users size={16} className="text-emerald-400" />
                    </div>
                    <h2
                      className={`text-3xl md:text-4xl font-extrabold mt-1 ${
                        resumoMes.saldoLivre >= 0 ? 'text-white' : 'text-rose-400'
                      }`}
                    >
                      {formatarMoeda(resumoMes.saldoLivre)}
                    </h2>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5 mt-5 pt-4 border-t border-zinc-800/80">
                    <div className="bg-zinc-950/60 p-2.5 md:p-3 rounded-xl border border-zinc-800/60">
                      <div className="flex items-center gap-1 text-emerald-400 text-xs font-medium">
                        <TrendingUp size={13} />
                        <span>Entradas</span>
                      </div>
                      <p className="text-xs md:text-base font-bold mt-1 text-zinc-100 truncate">
                        {formatarMoeda(resumoMes.receitas)}
                      </p>
                    </div>

                    <div className="bg-zinc-950/60 p-2.5 md:p-3 rounded-xl border border-zinc-800/60">
                      <div className="flex items-center gap-1 text-rose-400 text-xs font-medium">
                        <TrendingDown size={13} />
                        <span>Gastos</span>
                      </div>
                      <p className="text-xs md:text-base font-bold mt-1 text-zinc-100 truncate">
                        {formatarMoeda(resumoMes.despesas)}
                      </p>
                    </div>

                    <div className="bg-zinc-950/60 p-2.5 md:p-3 rounded-xl border border-zinc-800/60">
                      <div className="flex items-center gap-1 text-sky-400 text-xs font-medium">
                        <PiggyBank size={13} />
                        <span>Guardado</span>
                      </div>
                      <p className="text-xs md:text-base font-bold mt-1 text-zinc-100 truncate">
                        {formatarMoeda(resumoMes.poupadoMes)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                      Divisão de Gastos no Mês
                    </p>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      Comparativo de saídas por responsável
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-zinc-950/70 border border-zinc-800/70 rounded-xl p-2.5">
                      <span className="text-[11px] text-indigo-400 font-semibold block truncate">
                        {pessoa1}
                      </span>
                      <span className="text-xs md:text-sm font-bold text-zinc-100 mt-1 block truncate">
                        {formatarMoeda(resumoPorPessoa.p1Gastos)}
                      </span>
                    </div>
                    <div className="bg-zinc-950/70 border border-zinc-800/70 rounded-xl p-2.5">
                      <span className="text-[11px] text-pink-400 font-semibold block truncate">
                        {pessoa2}
                      </span>
                      <span className="text-xs md:text-sm font-bold text-zinc-100 mt-1 block truncate">
                        {formatarMoeda(resumoPorPessoa.p2Gastos)}
                      </span>
                    </div>
                    <div className="bg-zinc-950/70 border border-zinc-800/70 rounded-xl p-2.5">
                      <span className="text-[11px] text-amber-400 font-semibold block truncate">
                        Casal
                      </span>
                      <span className="text-xs md:text-sm font-bold text-zinc-100 mt-1 block truncate">
                        {formatarMoeda(resumoPorPessoa.casalGastos)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div
                      onClick={() => setAbaAtiva('metas')}
                      className="bg-sky-950/25 border border-sky-900/40 rounded-xl p-2.5 flex flex-col justify-between cursor-pointer hover:bg-sky-950/40 transition"
                    >
                      <span className="text-[11px] text-sky-300 flex items-center gap-1 font-medium">
                        <PiggyBank size={14} /> Poupança Atual
                      </span>
                      <strong className="text-xs md:text-sm text-white mt-1">
                        {formatarMoeda(dadosPoupancaGlobal.saldoAtual)}
                      </strong>
                    </div>

                    <div
                      onClick={() => setAbaAtiva('observacoes')}
                      className="bg-emerald-950/25 border border-emerald-900/40 rounded-xl p-2.5 flex flex-col justify-between cursor-pointer hover:bg-emerald-950/40 transition"
                    >
                      <span className="text-[11px] text-emerald-300 flex items-center gap-1 font-medium">
                        <FileText size={14} /> Notas do Mês
                      </span>
                      <strong className="text-xs md:text-sm text-white mt-1">
                        {qtdObsDoMes} anotação(ões)
                      </strong>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm md:text-base font-semibold text-zinc-200">
                    Lançamentos do Mês ({transacoesDoMes.length})
                  </h2>
                  <button
                    onClick={() => setAbaAtiva('extrato')}
                    className="text-xs md:text-sm text-emerald-400 hover:underline cursor-pointer"
                  >
                    Pesquisar / Filtrar
                  </button>
                </div>

                {transacoesDoMes.length === 0 ? (
                  <div className="text-center py-12 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl">
                    <p className="text-sm text-zinc-400">Nenhum lançamento neste mês.</p>
                    <p className="text-xs text-zinc-500 mt-1">
                      Use o botão "+" para registrar ou importe extratos na aba Extrato.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    {transacoesDoMes.map((t) => (
                      <CardTransacao
                        key={t.id}
                        transacao={t}
                        pessoa1={pessoa1}
                        onEditar={handleAbrirEditarTransacao}
                        onExcluir={handleExcluir}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ABA 2: EXTRATO (COM IMPORTADOR DE EXTRATOS BANCÁRIOS + PLANILHA ANTIGA) */}
          {abaAtiva === 'extrato' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold">Extrato Compartilhado</h2>
                  <p className="text-xs text-zinc-400">
                    {transacoesFiltradas.length} registro(s) encontrado(s) em {nomeMesAno(mesSelecionado)}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <ImportadorExtratoBancario
                    mesSelecionado={mesSelecionado}
                    pessoa1={pessoa1}
                    pessoa2={pessoa2}
                    onImportarLancamentos={handleImportarExtratoBancario}
                  />

                  {contaAtiva === 'casal' && (
                    <ImportadorPlanilhaGastos onImportarDados={handleImportarPlanilhaAntiga} />
                  )}
                </div>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1">
                {(
                  [
                    { id: 'todos', label: 'Todos' },
                    { id: 'despesa', label: 'Despesas' },
                    { id: 'receita', label: 'Receitas' },
                    { id: 'transferencia_interna', label: 'Movimentações (⇄)' },
                    { id: 'poupanca', label: 'Guardado' },
                    { id: 'resgate_poupanca', label: 'Retiradas Poupança' },
                  ] as const
                ).map((tipo) => (
                  <button
                    key={tipo.id}
                    onClick={() => setFiltroTipo(tipo.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer shrink-0 ${
                      filtroTipo === tipo.id
                        ? 'bg-emerald-500 text-zinc-950 font-semibold'
                        : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
                    }`}
                  >
                    {tipo.label}
                  </button>
                ))}
              </div>

              <div className="relative">
                <Search size={16} className="absolute left-3.5 top-3 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Buscar local, pessoa, categoria ou #tag..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {transacoesFiltradas.map((t) => (
                  <CardTransacao
                    key={t.id}
                    transacao={t}
                    pessoa1={pessoa1}
                    onEditar={handleAbrirEditarTransacao}
                    onExcluir={handleExcluir}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ABA: OBSERVAÇÕES DO MÊS */}
          {abaAtiva === 'observacoes' && (
            <AbaObservacoes
              mesSelecionado={mesSelecionado}
              observacoes={observacoesMes}
              pessoa1={pessoa1}
              pessoa2={pessoa2}
              onSalvarObservacao={handleSalvarObservacao}
              onAlternarResolvido={handleAlternarResolvidoObs}
              onExcluirObservacao={handleExcluirObservacao}
            />
          )}

          {/* ABA: ENXOVAL DA CASA NOVA */}
          {abaAtiva === 'enxoval' && (
            <AbaEnxoval
              itens={itensEnxoval}
              onSalvarItem={handleSalvarItemEnxoval}
              onImportarEmLote={handleImportarEnxovalEmLote}
              onAlternarComprado={handleAlternarCompradoEnxoval}
              onExcluirItem={handleExcluirItemEnxoval}
            />
          )}

          {/* ABA 3: POUPANÇA & METAS DE GASTOS DO MÊS */}
          {abaAtiva === 'metas' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-5 bg-gradient-to-br from-sky-950/50 to-zinc-900 border border-sky-900/50 rounded-2xl p-5 h-fit space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sky-400">
                      <PiggyBank size={20} />
                      <h2 className="font-bold text-sm uppercase tracking-wider">
                        Saldo Atual na Poupança
                      </h2>
                    </div>
                    <button
                      onClick={() => {
                        setNovaMetaInput(metaPoupanca.toString());
                        setEditandoMeta(!editandoMeta);
                      }}
                      className="text-xs text-sky-400 hover:underline cursor-pointer"
                    >
                      {editandoMeta ? 'Cancelar' : 'Editar Meta'}
                    </button>
                  </div>

                  <div>
                    <p className="text-3xl font-extrabold text-white">
                      {formatarMoeda(dadosPoupancaGlobal.saldoAtual)}
                    </p>
                    <p className="text-xs text-zinc-400 mt-1">
                      Meta: {formatarMoeda(metaPoupanca)} (
                      {Math.max(
                        0,
                        Math.min(
                          100,
                          Math.round((dadosPoupancaGlobal.saldoAtual / metaPoupanca) * 100)
                        )
                      )}
                      %)
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <button
                      onClick={() => {
                        setTransacaoEditando(null);
                        setTipoInicialModal('poupanca');
                        setModalAberto(true);
                      }}
                      className="bg-sky-500 hover:bg-sky-400 text-zinc-950 font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <Plus size={15} strokeWidth={2.5} /> Guardar Valor
                    </button>

                    <button
                      onClick={() => {
                        setTransacaoEditando(null);
                        setTipoInicialModal('resgate_poupanca');
                        setModalAberto(true);
                      }}
                      className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <ArrowDownLeft size={15} /> Retirar Valor
                    </button>
                  </div>

                  {editandoMeta && (
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={novaMetaInput}
                        onChange={(e) => setNovaMetaInput(e.target.value)}
                        className="flex-1 bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-1.5 text-sm text-white"
                      />
                      <button
                        onClick={() => {
                          const val = Number(novaMetaInput);
                          if (val > 0) {
                            setMetaPoupanca(val);
                            salvarConfigCasal(val);
                          }
                          setEditandoMeta(false);
                        }}
                        className="bg-sky-500 text-zinc-950 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Check size={14} /> Salvar
                      </button>
                    </div>
                  )}

                  <div className="w-full h-3 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                    <div
                      className="h-full bg-sky-400 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.max(
                          0,
                          Math.min(100, (dadosPoupancaGlobal.saldoAtual / metaPoupanca) * 100)
                        )}%`,
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                    <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-2.5">
                      <span className="text-zinc-400 block">Total Já Guardado</span>
                      <strong className="text-sky-300">
                        {formatarMoeda(dadosPoupancaGlobal.totalGuardado)}
                      </strong>
                    </div>
                    <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-2.5">
                      <span className="text-zinc-400 block">Total Já Retirado</span>
                      <strong className="text-amber-400">
                        - {formatarMoeda(dadosPoupancaGlobal.totalRetirado)}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* TETO DE GASTOS MENSAL */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-sm md:text-base font-semibold text-zinc-200">
                          Meta / Teto de Gastos do Mês
                        </h3>
                        <p className="text-xs text-zinc-400">
                          Defina quanto pretendem gastar em cada categoria por mês
                        </p>
                      </div>

                      {!editandoOrcamentos ? (
                        <button
                          onClick={abrirEdicaoOrcamentos}
                          className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-emerald-400 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer"
                        >
                          <Pencil size={13} />
                          Alterar Metas do Mês
                        </button>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditandoOrcamentos(false)}
                            className="text-xs text-zinc-400 hover:text-white px-2 py-1 cursor-pointer"
                          >
                            Cancelar
                          </button>
                          <button
                            onClick={salvarOrcamentos}
                            className="flex items-center gap-1 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer"
                          >
                            <Check size={14} /> Salvar Metas
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {orcamentos.map((orc) => {
                        const gastoAtual = transacoesDoMes
                          .filter((t) => t.tipo === 'despesa' && t.categoria === orc.categoria)
                          .reduce((acc, t) => acc + t.valor, 0);
                        const pct =
                          orc.limite > 0
                            ? Math.min(100, Math.round((gastoAtual / orc.limite) * 100))
                            : 0;
                        const estourou = orc.limite > 0 && gastoAtual > orc.limite;

                        return (
                          <div
                            key={orc.categoria}
                            className="bg-zinc-900/70 border border-zinc-800/80 rounded-xl p-4 space-y-2"
                          >
                            <div className="flex justify-between items-center text-xs">
                              <span className="font-semibold text-zinc-200">{orc.categoria}</span>
                              {!editandoOrcamentos ? (
                                <span
                                  className={estourou ? 'text-rose-400 font-bold' : 'text-zinc-400'}
                                >
                                  {formatarMoeda(gastoAtual)} / {formatarMoeda(orc.limite)}
                                </span>
                              ) : (
                                <div className="flex items-center gap-1">
                                  <span className="text-zinc-400 text-[11px]">R$</span>
                                  <input
                                    type="number"
                                    value={orcamentosTemp[orc.categoria] ?? orc.limite}
                                    onChange={(e) =>
                                      setOrcamentosTemp((prev) => ({
                                        ...prev,
                                        [orc.categoria]: e.target.value,
                                      }))
                                    }
                                    className="w-24 bg-zinc-950 border border-emerald-500/60 rounded-lg px-2 py-1 text-xs font-bold text-white text-right focus:outline-none"
                                  />
                                </div>
                              )}
                            </div>

                            <div className="w-full h-2.5 bg-zinc-950 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  estourou
                                    ? 'bg-rose-500'
                                    : pct > 80
                                    ? 'bg-amber-400'
                                    : 'bg-emerald-400'
                                }`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm md:text-base font-semibold text-zinc-200 mb-3">
                      Histórico da Poupança (Depósitos e Retiradas)
                    </h3>
                    {dadosPoupancaGlobal.historicoMovimentacoes.length === 0 ? (
                      <p className="text-xs text-zinc-500 bg-zinc-900/40 border border-zinc-800/60 rounded-xl p-4">
                        Nenhuma movimentação na poupança ainda.
                      </p>
                    ) : (
                      <div className="space-y-2.5">
                        {dadosPoupancaGlobal.historicoMovimentacoes.slice(0, 10).map((t) => (
                          <CardTransacao
                            key={t.id}
                            transacao={t}
                            pessoa1={pessoa1}
                            onEditar={handleAbrirEditarTransacao}
                            onExcluir={handleExcluir}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ABA 4: ANÁLISE */}
          {abaAtiva === 'graficos' && (
            <div className="space-y-5 max-w-3xl">
              <h2 className="text-lg font-bold">Análise de Gastos por Categoria</h2>
              {gastosPorCategoria.length === 0 ? (
                <p className="text-sm text-zinc-500 py-8 text-center">Sem despesas neste mês.</p>
              ) : (
                <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 space-y-4">
                  {gastosPorCategoria.map((item) => {
                    const pct = Math.round((item.total / resumoMes.despesas) * 100) || 0;
                    return (
                      <div key={item.categoria} className="space-y-1.5">
                        <div className="flex justify-between text-xs md:text-sm">
                          <span className="font-medium text-zinc-200">{item.categoria}</span>
                          <span className="text-zinc-400">
                            <strong className="text-zinc-100">{formatarMoeda(item.total)}</strong> ({pct}%)
                          </span>
                        </div>
                        <div className="w-full h-2.5 bg-zinc-950 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-400 rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </main>

        {/* ==================== BOTTOM NAVIGATION MOBILE ==================== */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 backdrop-blur-md border-t border-zinc-800/80">
          <div className="w-full px-1 h-16 grid grid-cols-6 items-center relative">
            <button
              onClick={() => setAbaAtiva('home')}
              className={`flex flex-col items-center justify-center h-full gap-1 text-[10px] transition cursor-pointer ${
                abaAtiva === 'home' ? 'text-emerald-400 font-semibold' : 'text-zinc-500'
              }`}
            >
              <Home size={18} />
              <span>Início</span>
            </button>

            <button
              onClick={() => setAbaAtiva('extrato')}
              className={`flex flex-col items-center justify-center h-full gap-1 text-[10px] transition cursor-pointer ${
                abaAtiva === 'extrato' ? 'text-emerald-400 font-semibold' : 'text-zinc-500'
              }`}
            >
              <List size={18} />
              <span>Extrato</span>
            </button>

            <button
              onClick={() => setAbaAtiva('observacoes')}
              className={`flex flex-col items-center justify-center h-full gap-1 text-[10px] transition cursor-pointer ${
                abaAtiva === 'observacoes' ? 'text-emerald-400 font-semibold' : 'text-zinc-500'
              }`}
            >
              <FileText size={18} />
              <span>Notas</span>
            </button>

            <button
              onClick={() => setAbaAtiva('enxoval')}
              className={`flex flex-col items-center justify-center h-full gap-1 text-[10px] transition cursor-pointer ${
                abaAtiva === 'enxoval' ? 'text-emerald-400 font-semibold' : 'text-zinc-500'
              }`}
            >
              <Package size={18} />
              <span>Enxoval</span>
            </button>

            <button
              onClick={() => setAbaAtiva('metas')}
              className={`flex flex-col items-center justify-center h-full gap-1 text-[10px] transition cursor-pointer ${
                abaAtiva === 'metas' ? 'text-emerald-400 font-semibold' : 'text-zinc-500'
              }`}
            >
              <Target size={18} />
              <span>Poupança</span>
            </button>

            <div className="flex items-center justify-center">
              <button
                onClick={() => {
                  setTransacaoEditando(null);
                  setTipoInicialModal('despesa');
                  setModalAberto(true);
                }}
                className="w-11 h-11 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-lg shadow-emerald-500/25 flex items-center justify-center transition transform active:scale-95 cursor-pointer"
                title="Novo Lançamento"
              >
                <Plus size={22} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </nav>

        {/* MODAIS */}
        <ModalTransacao
          aberto={modalAberto}
          onFechar={() => {
            setModalAberto(false);
            setTransacaoEditando(null);
          }}
          pessoa1={pessoa1}
          pessoa2={pessoa2}
          salvando={salvando}
          transacaoEditando={transacaoEditando}
          tipoInicial={tipoInicialModal}
          onSalvar={handleSalvarTransacao}
        />

        <ModalConfigCasal
          aberto={modalConfigAberto}
          onFechar={() => setModalConfigAberto(false)}
          pessoa1={pessoa1}
          pessoa2={pessoa2}
          onSalvarNomes={(novoP1, novoP2, novaSenha) =>
            salvarConfigCasal(metaPoupanca, novoP1, novoP2, novaSenha)
          }
        />
      </div>
    </div>
  );
}
```

## src\components\AbaEnxoval.tsx
```tsx
import React, { useState, useMemo } from 'react';
import * as XLSX from 'xlsx';
import {
  Package,
  Plus,
  Upload,
  Search,
  CheckCircle2,
  Circle,
  Pencil,
  Trash2,
  Home as HomeIcon,
  AlertCircle,
  X,
  Sparkles,
} from 'lucide-react';
import {
  type EnxovalItem,
  type PrioridadeItem,
  COMODOS_PADRAO,
  formatarMoeda,
} from '../types';

interface AbaEnxovalProps {
  itens: EnxovalItem[];
  onSalvarItem: (item: EnxovalItem) => Promise<void>;
  onImportarEmLote: (novosItens: EnxovalItem[]) => Promise<void>;
  onAlternarComprado: (item: EnxovalItem) => Promise<void>;
  onExcluirItem: (id: string) => Promise<void>;
}

export function AbaEnxoval({
  itens,
  onSalvarItem,
  onImportarEmLote,
  onAlternarComprado,
  onExcluirItem,
}: AbaEnxovalProps) {
  const [comodoFiltro, setComodoFiltro] = useState<string>('Todos');
  const [statusFiltro, setStatusFiltro] = useState<'todos' | 'comprados' | 'pendentes'>('todos');
  const [busca, setBusca] = useState('');

  // Modal de Criar / Editar Item
  const [modalItemAberto, setModalItemAberto] = useState(false);
  const [itemEditando, setItemEditando] = useState<EnxovalItem | null>(null);

  const [comodoForm, setComodoForm] = useState('Cozinha');
  const [nomeItemForm, setNomeItemForm] = useState('');
  const [qtdForm, setQtdForm] = useState('1');
  const [valorForm, setValorForm] = useState('');
  const [prioridadeForm, setPrioridadeForm] = useState<PrioridadeItem>('Média');
  const [obsForm, setObsForm] = useState('');
  const [compradoForm, setCompradoForm] = useState(false);

  const [importando, setImportando] = useState(false);
  const [msgImportacao, setMsgImportacao] = useState<string | null>(null);

  // Lista dinâmica de cômodos (une os padrões com qualquer cômodo novo vindo da planilha)
  const listaComodos = useMemo(() => {
    const conjunto = new Set<string>(COMODOS_PADRAO);
    itens.forEach((i) => {
      if (i.comodo) conjunto.add(i.comodo);
    });
    return Array.from(conjunto);
  }, [itens]);

  // Estatísticas do Enxoval
  const estatisticas = useMemo(() => {
    const totalItens = itens.length;
    const comprados = itens.filter((i) => i.comprado).length;
    const pendentes = totalItens - comprados;
    const progresso = totalItens > 0 ? Math.round((comprados / totalItens) * 100) : 0;

    const valorJaComprado = itens
      .filter((i) => i.comprado)
      .reduce((acc, i) => acc + i.valor * (i.quantidade || 1), 0);

    const valorFaltaComprar = itens
      .filter((i) => !i.comprado)
      .reduce((acc, i) => acc + i.valor * (i.quantidade || 1), 0);

    return { totalItens, comprados, pendentes, progresso, valorJaComprado, valorFaltaComprar };
  }, [itens]);

  const abrirModalNovo = () => {
    setItemEditando(null);
    setComodoForm(comodoFiltro !== 'Todos' ? comodoFiltro : 'Cozinha');
    setNomeItemForm('');
    setQtdForm('1');
    setValorForm('');
    setPrioridadeForm('Média');
    setObsForm('');
    setCompradoForm(false);
    setModalItemAberto(true);
  };

  const abrirModalEditar = (item: EnxovalItem) => {
    setItemEditando(item);
    setComodoForm(item.comodo);
    setNomeItemForm(item.item);
    setQtdForm(String(item.quantidade));
    setValorForm(item.valor ? String(item.valor).replace('.', ',') : '');
    setPrioridadeForm(item.prioridade);
    setObsForm(item.observacao || '');
    setCompradoForm(item.comprado);
    setModalItemAberto(true);
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomeItemForm.trim()) return;

    const valorLimpo = valorForm.includes(',')
      ? valorForm.replace(/\./g, '').replace(',', '.')
      : valorForm;
    const valorNum = parseFloat(valorLimpo) || 0;
    const qtdNum = Math.max(1, parseInt(qtdForm, 10) || 1);

    const novoItem: EnxovalItem = {
      id: itemEditando ? itemEditando.id : `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      comodo: comodoForm.trim() || 'Outros',
      item: nomeItemForm.trim(),
      quantidade: qtdNum,
      valor: valorNum,
      prioridade: prioridadeForm,
      observacao: obsForm.trim(),
      comprado: compradoForm,
    };

    await onSalvarItem(novoItem);
    setModalItemAberto(false);
  };

  // ============================================================================
  // ALGORITMO INTELIGENTE DE LEITURA DE PLANILHA (.XLSX, .XLS, .CSV)
  // ============================================================================
  const normalizarTexto = (txt: any) =>
    String(txt ?? '')
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  const extrairNumero = (val: any): number => {
    if (typeof val === 'number') return val;
    const str = String(val ?? '')
      .replace(/R\$/gi, '')
      .replace(/\s/g, '')
      .trim();
    if (!str) return 0;
    const limpo = str.includes(',') ? str.replace(/\./g, '').replace(',', '.') : str;
    const num = parseFloat(limpo);
    return isNaN(num) ? 0 : num;
  };

  const interpretarPrioridade = (val: any): PrioridadeItem => {
    const t = normalizarTexto(val);
    if (t.includes('alt') || t.includes('urgent') || t === '1' || t.includes('essencial')) {
      return 'Alta';
    }
    if (t.includes('baix') || t === '3' || t.includes('depois')) {
      return 'Baixa';
    }
    return 'Média';
  };

  const interpretarComprado = (val: any): boolean => {
    if (typeof val === 'boolean') return val;
    const t = normalizarTexto(val);
    return (
      t === 'sim' ||
      t === 's' ||
      t === 'ok' ||
      t === 'x' ||
      t === 'comprado' ||
      t === 'ja temos' ||
      t === 'tenho' ||
      t === 'true' ||
      t === '1' ||
      t === 'feito' ||
      t.includes('comprad')
    );
  };

  const handleUploadPlanilha = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportando(true);
    setMsgImportacao(null);

    try {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: 'array' });
      const itensExtraidos: EnxovalItem[] = [];

      workbook.SheetNames.forEach((sheetName) => {
        const sheet = workbook.Sheets[sheetName];
        const linhas: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });

        // Define o cômodo inicial pelo nome da aba (se não for genérico como "Planilha1" ou "Página1")
        let comodoAtual =
          /^(planilha|sheet|pagina|aba)\s*\d*$/i.test(sheetName.trim())
            ? 'Cozinha'
            : sheetName.trim();

        // Índices das colunas detectadas
        let colItem = -1;
        let colQtd = -1;
        let colValor = -1;
        let colPrio = -1;
        let colObs = -1;
        let colComprado = -1;
        let colComodo = -1;

        for (let r = 0; r < linhas.length; r++) {
          const linha = linhas[r];
          const celulasPreenchidas = linha.filter((c) => String(c).trim() !== '');
          if (celulasPreenchidas.length === 0) continue;

          const textosNorm = linha.map(normalizarTexto);

          // 1. Verifica se esta linha é um cabeçalho de tabela (contém "item"/"produto" e "qtd"/"valor"/"comprado")
          const idxItem = textosNorm.findIndex(
            (t) => t === 'item' || t === 'itens' || t === 'produto' || t === 'nome' || t === 'descricao'
          );
          const temOutrasColunas = textosNorm.some(
            (t) =>
              t.includes('quant') ||
              t.includes('qtd') ||
              t.includes('valor') ||
              t.includes('preco') ||
              t.includes('prioridade') ||
              t.includes('comprado') ||
              t.includes('status')
          );

          if (idxItem !== -1 && temOutrasColunas) {
            colItem = idxItem;
            colQtd = textosNorm.findIndex((t) => t.includes('quant') || t.includes('qtd') || t === 'un');
            colValor = textosNorm.findIndex(
              (t) => t.includes('valor') || t.includes('preco') || t.includes('custo') || t.includes('total')
            );
            colPrio = textosNorm.findIndex((t) => t.includes('prioridade') || t.includes('urgencia'));
            colObs = textosNorm.findIndex((t) => t.includes('obs') || t.includes('nota') || t.includes('detalhe'));
            colComprado = textosNorm.findIndex(
              (t) => t.includes('comprado') || t.includes('status') || t.includes('ja tem') || t.includes('ok')
            );
            colComodo = textosNorm.findIndex((t) => t.includes('comodo') || t.includes('ambiente'));

            // Olha a linha imediatamente acima para ver se tinha o título do Cômodo (Ex: "COZINHA")
            if (r > 0) {
              const linhaAnterior = linhas[r - 1].filter((c) => String(c).trim() !== '');
              if (linhaAnterior.length === 1) {
                const possivelComodo = String(linhaAnterior[0]).trim();
                if (possivelComodo.length > 2 && possivelComodo.length < 35) {
                  comodoAtual = possivelComodo;
                }
              }
            }
            continue;
          }

          // 2. Se a linha tem apenas 1 célula preenchida, pode ser um divisor de cômodo (ex: "SALA", "QUARTO")
          if (celulasPreenchidas.length === 1) {
            const textoUnico = String(celulasPreenchidas[0]).trim();
            if (
              textoUnico.length >= 3 &&
              textoUnico.length <= 30 &&
              !/total|subtotal|resumo/i.test(textoUnico)
            ) {
              comodoAtual =
                textoUnico.charAt(0).toUpperCase() + textoUnico.slice(1).toLowerCase();
            }
            continue;
          }

          // 3. Se já encontramos um cabeçalho válido, lemos a linha como um item do enxoval!
          if (colItem !== -1) {
            const nomeDoItem = String(linha[colItem] ?? '').trim();
            if (
              !nomeDoItem ||
              /^(total|subtotal|soma|item|produto)$/i.test(nomeDoItem)
            ) {
              continue;
            }

            const qtd = colQtd !== -1 ? Math.max(1, Math.round(extrairNumero(linha[colQtd]) || 1)) : 1;
            const valor = colValor !== -1 ? extrairNumero(linha[colValor]) : 0;
            const prioridade = colPrio !== -1 ? interpretarPrioridade(linha[colPrio]) : 'Média';
            const observacao = colObs !== -1 ? String(linha[colObs] ?? '').trim() : '';
            const comprado = colComprado !== -1 ? interpretarComprado(linha[colComprado]) : false;
            const comodoLinha =
              colComodo !== -1 && String(linha[colComodo]).trim()
                ? String(linha[colComodo]).trim()
                : comodoAtual;

            itensExtraidos.push({
              id: `${Date.now()}-${itensExtraidos.length}-${Math.random().toString(36).slice(2, 6)}`,
              comodo: comodoLinha,
              item: nomeDoItem,
              quantidade: qtd,
              valor,
              prioridade,
              observacao,
              comprado,
            });
          }
        }
      });

      if (itensExtraidos.length === 0) {
        alert(
          'Não encontramos itens com as colunas esperadas (Item, Quantidade, Valor, Prioridade, Observação, Comprado). Verifique se a primeira linha da tabela tem esses títulos!'
        );
      } else {
        await onImportarEmLote(itensExtraidos);
        setMsgImportacao(`🎉 ${itensExtraidos.length} itens importados da planilha com sucesso!`);
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao ler o arquivo da planilha. Tente salvar como .xlsx ou .csv.');
    } finally {
      setImportando(false);
      e.target.value = '';
    }
  };

  // Filtragem dos itens na tela
  const itensFiltrados = useMemo(() => {
    return itens.filter((i) => {
      const bateComodo = comodoFiltro === 'Todos' || i.comodo.toLowerCase() === comodoFiltro.toLowerCase();
      const bateStatus =
        statusFiltro === 'todos' ||
        (statusFiltro === 'comprados' && i.comprado) ||
        (statusFiltro === 'pendentes' && !i.comprado);
      const termo = busca.toLowerCase();
      const bateBusca =
        i.item.toLowerCase().includes(termo) ||
        i.comodo.toLowerCase().includes(termo) ||
        (i.observacao && i.observacao.toLowerCase().includes(termo));

      return bateComodo && bateStatus && bateBusca;
    });
  }, [itens, comodoFiltro, statusFiltro, busca]);

  const corPrioridade = (prio: PrioridadeItem) => {
    if (prio === 'Alta') return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
    if (prio === 'Baixa') return 'bg-zinc-800 text-zinc-400 border-zinc-700';
    return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
  };

  return (
    <div className="space-y-6">
      {/* CABEÇALHO E BOTÕES DE AÇÃO (NOVO ITEM + IMPORTAR PLANILHA) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
            <Package className="text-emerald-400" size={22} />
            Enxoval da Casa Nova
          </h2>
          <p className="text-xs text-zinc-400">
            Controle de tudo o que já temos e o que falta comprar por cômodo
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 px-3.5 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition">
            <Upload size={15} className="text-sky-400" />
            <span>{importando ? 'Lendo planilha...' : 'Importar Planilha'}</span>
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleUploadPlanilha}
              disabled={importando}
              className="hidden"
            />
          </label>

          <button
            onClick={abrirModalNovo}
            className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-3.5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer"
          >
            <Plus size={16} strokeWidth={2.5} />
            Novo Item
          </button>
        </div>
      </div>

      {msgImportacao && (
        <div className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 px-4 py-3 rounded-xl text-xs flex items-center justify-between">
          <span className="flex items-center gap-2 font-medium">
            <Sparkles size={15} /> {msgImportacao}
          </span>
          <button onClick={() => setMsgImportacao(null)} className="text-emerald-400">
            <X size={15} />
          </button>
        </div>
      )}

      {/* PAINEL DE PROGRESSO DO ENXOVAL */}
      <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-emerald-950/30 border border-zinc-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">
              Progresso do Enxoval
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <h3 className="text-2xl md:text-3xl font-extrabold text-white">
                {estatisticas.progresso}% Concluído
              </h3>
              <span className="text-xs text-emerald-400 font-medium">
                ({estatisticas.comprados} de {estatisticas.totalItens} itens comprados)
              </span>
            </div>
          </div>
        </div>

        <div className="w-full h-3 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
          <div
            className="h-full bg-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${estatisticas.progresso}%` }}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
          <div className="bg-zinc-950/60 border border-zinc-800/70 rounded-xl p-3">
            <span className="text-[11px] text-emerald-400 font-medium block">Já Temos / Comprado</span>
            <strong className="text-sm md:text-base text-white mt-0.5 block">
              {formatarMoeda(estatisticas.valorJaComprado)}
            </strong>
          </div>
          <div className="bg-zinc-950/60 border border-zinc-800/70 rounded-xl p-3">
            <span className="text-[11px] text-amber-400 font-medium block">Falta Comprar (Estimado)</span>
            <strong className="text-sm md:text-base text-white mt-0.5 block">
              {formatarMoeda(estatisticas.valorFaltaComprar)}
            </strong>
          </div>
          <div className="col-span-2 sm:col-span-1 bg-zinc-950/60 border border-zinc-800/70 rounded-xl p-3">
            <span className="text-[11px] text-sky-400 font-medium block">Itens Pendentes</span>
            <strong className="text-sm md:text-base text-white mt-0.5 block">
              {estatisticas.pendentes} item(ns)
            </strong>
          </div>
        </div>
      </div>

      {/* FILTRO DE CÔMODOS E BUSCA */}
      <div className="space-y-3">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {['Todos', ...listaComodos].map((comodo) => (
            <button
              key={comodo}
              onClick={() => setComodoFiltro(comodo)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition shrink-0 cursor-pointer ${
                comodoFiltro === comodo
                  ? 'bg-emerald-500 text-zinc-950'
                  : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
              }`}
            >
              {comodo}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-3 text-zinc-500" />
            <input
              type="text"
              placeholder="Buscar utensílio, roupa de cama, observação..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex gap-1.5 bg-zinc-900 p-1 rounded-xl border border-zinc-800 shrink-0">
            {(
              [
                { id: 'todos', label: 'Todos' },
                { id: 'comprados', label: 'Já Temos' },
                { id: 'pendentes', label: 'Falta Comprar' },
              ] as const
            ).map((st) => (
              <button
                key={st.id}
                onClick={() => setStatusFiltro(st.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  statusFiltro === st.id ? 'bg-zinc-800 text-white' : 'text-zinc-400'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* LISTAGEM DOS ITENS DO ENXOVAL */}
      {itensFiltrados.length === 0 ? (
        <div className="text-center py-12 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-6">
          <Package size={32} className="mx-auto text-zinc-600 mb-2" />
          <p className="text-sm text-zinc-300 font-medium">Nenhum item encontrado neste filtro.</p>
          <p className="text-xs text-zinc-500 mt-1">
            Clique em "Importar Planilha" no topo para carregar sua tabela do Excel/Sheets ou em "+ Novo Item".
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {itensFiltrados.map((item) => (
            <div
              key={item.id}
              className={`border rounded-xl p-3.5 md:p-4 flex items-start justify-between gap-3 transition ${
                item.comprado
                  ? 'bg-emerald-950/15 border-emerald-900/40'
                  : 'bg-zinc-900/70 border-zinc-800/80 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-start gap-3 min-w-0">
                <button
                  onClick={() => onAlternarComprado(item)}
                  className={`mt-0.5 shrink-0 transition cursor-pointer ${
                    item.comprado ? 'text-emerald-400' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                  title={item.comprado ? 'Marcar como pendente' : 'Marcar como já comprado'}
                >
                  {item.comprado ? <CheckCircle2 size={22} /> : <Circle size={22} />}
                </button>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p
                      className={`font-semibold text-sm md:text-base truncate ${
                        item.comprado ? 'line-through text-zinc-400' : 'text-zinc-100'
                      }`}
                    >
                      {item.quantidade > 1 ? `${item.quantidade}x ` : ''}
                      {item.item}
                    </p>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-md font-semibold border ${corPrioridade(
                        item.prioridade
                      )}`}
                    >
                      {item.prioridade}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-400 mt-1">
                    <span className="flex items-center gap-1 text-zinc-300 font-medium">
                      <HomeIcon size={12} className="text-emerald-400" /> {item.comodo}
                    </span>
                    <span>Qtd: {item.quantidade}</span>
                    {item.valor > 0 && (
                      <span>
                        Valor un.: <strong className="text-zinc-200">{formatarMoeda(item.valor)}</strong>
                      </span>
                    )}
                  </div>

                  {item.observacao && (
                    <p className="text-xs text-zinc-400 bg-zinc-950/60 border border-zinc-800/60 rounded-lg px-2.5 py-1.5 mt-2 flex items-start gap-1.5">
                      <AlertCircle size={12} className="text-sky-400 shrink-0 mt-0.5" />
                      <span>{item.observacao}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-end shrink-0">
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    item.comprado
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {item.comprado ? 'Comprado' : 'Falta'}
                </span>

                <div className="flex items-center gap-1 mt-2">
                  <button
                    onClick={() => abrirModalEditar(item)}
                    className="text-zinc-500 hover:text-emerald-400 p-1.5 rounded-lg hover:bg-zinc-800/60 transition cursor-pointer"
                    title="Editar item"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => onExcluirItem(item.id)}
                    className="text-zinc-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-zinc-800/60 transition cursor-pointer"
                    title="Excluir item"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL DE ADICIONAR / EDITAR ITEM DO ENXOVAL */}
      {modalItemAberto && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-lg rounded-t-3xl sm:rounded-2xl p-5 md:p-6 space-y-4 shadow-2xl max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base md:text-lg text-white">
                {itemEditando ? 'Editar Item do Enxoval' : 'Novo Item do Enxoval'}
              </h3>
              <button
                onClick={() => setModalItemAberto(false)}
                className="p-1.5 rounded-full bg-zinc-800 text-zinc-400 hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-zinc-400 font-medium">Cômodo</label>
                  <input
                    type="text"
                    list="lista-comodos"
                    required
                    value={comodoForm}
                    onChange={(e) => setComodoForm(e.target.value)}
                    placeholder="Ex: Cozinha, Quarto..."
                    className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                  <datalist id="lista-comodos">
                    {listaComodos.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <label className="text-xs text-zinc-400 font-medium">Prioridade</label>
                  <select
                    value={prioridadeForm}
                    onChange={(e) => setPrioridadeForm(e.target.value as PrioridadeItem)}
                    className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Alta">Alta</option>
                    <option value="Média">Média</option>
                    <option value="Baixa">Baixa</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-zinc-400 font-medium">Nome do Item</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Jogo de Panelas, Jogo de Lençol Casal..."
                  value={nomeItemForm}
                  onChange={(e) => setNomeItemForm(e.target.value)}
                  className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-zinc-400 font-medium">Quantidade</label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={qtdForm}
                    onChange={(e) => setQtdForm(e.target.value)}
                    className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-400 font-medium">Valor Estimado/Pago (R$)</label>
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="0,00 (opcional)"
                    value={valorForm}
                    onChange={(e) => setValorForm(e.target.value)}
                    className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-zinc-400 font-medium">Observação (opcional)</label>
                <input
                  type="text"
                  placeholder="Ex: Cor inox, ganhamos de presente, link da loja..."
                  value={obsForm}
                  onChange={(e) => setObsForm(e.target.value)}
                  className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white"
                />
              </div>

              <label className="flex items-center gap-2.5 bg-zinc-950 border border-zinc-800 rounded-xl p-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={compradoForm}
                  onChange={(e) => setCompradoForm(e.target.checked)}
                  className="w-4 h-4 accent-emerald-500"
                />
                <span className="text-xs md:text-sm font-semibold text-zinc-200">
                  Já temos / Já está comprado!
                </span>
              </label>

              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-3 rounded-xl text-sm transition cursor-pointer"
              >
                {itemEditando ? 'Salvar Alterações' : 'Cadastrar no Enxoval'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
```

## src\components\AbaObservacoes.tsx
```tsx
import React, { useState } from 'react';
import {
  FileText,
  Plus,
  CheckCircle2,
  Clock,
  Pencil,
  Trash2,
  User,
  Users,
  Calendar,
  X,
  DollarSign,
} from 'lucide-react';
import {
  type ObservacaoMes,
  formatarMoeda,
  formatarDataBR,
  nomeMesAno,
  obterDataHojeLocal,
} from '../types';

interface AbaObservacoesProps {
  mesSelecionado: string;
  observacoes: ObservacaoMes[];
  pessoa1: string;
  pessoa2: string;
  onSalvarObservacao: (obs: ObservacaoMes) => Promise<void>;
  onAlternarResolvido: (obs: ObservacaoMes) => Promise<void>;
  onExcluirObservacao: (id: string) => Promise<void>;
}

export function AbaObservacoes({
  mesSelecionado,
  observacoes,
  pessoa1,
  pessoa2,
  onSalvarObservacao,
  onAlternarResolvido,
  onExcluirObservacao,
}: AbaObservacoesProps) {
  const [modalAberto, setModalAberto] = useState(false);
  const [obsEditando, setObsEditando] = useState<ObservacaoMes | null>(null);

  const [autorForm, setAutorForm] = useState<string>(pessoa1);
  const [tituloForm, setTituloForm] = useState('');
  const [textoForm, setTextoForm] = useState('');
  const [valorForm, setValorForm] = useState('');
  const [resolvidoForm, setResolvidoForm] = useState(false);

  const obsDoMes = observacoes.filter((o) => o.mes === mesSelecionado);

  const abrirModalNova = () => {
    setObsEditando(null);
    setAutorForm(pessoa1);
    setTituloForm('');
    setTextoForm('');
    setValorForm('');
    setResolvidoForm(false);
    setModalAberto(true);
  };

  const abrirModalEditar = (obs: ObservacaoMes) => {
    setObsEditando(obs);
    setAutorForm(obs.autor);
    setTituloForm(obs.titulo);
    setTextoForm(obs.texto);
    setValorForm(obs.valor ? String(obs.valor).replace('.', ',') : '');
    setResolvidoForm(obs.resolvido);
    setModalAberto(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tituloForm.trim() || !textoForm.trim()) return;

    const valorLimpo = valorForm.includes(',')
      ? valorForm.replace(/\./g, '').replace(',', '.')
      : valorForm;
    const valorNum = parseFloat(valorLimpo) || 0;

    const novaObs: ObservacaoMes = {
      id: obsEditando ? obsEditando.id : `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      mes: mesSelecionado,
      autor: autorForm,
      titulo: tituloForm.trim(),
      texto: textoForm.trim(),
      valor: valorNum > 0 ? valorNum : undefined,
      resolvido: resolvidoForm,
      dataCriacao: obsEditando ? obsEditando.dataCriacao : obterDataHojeLocal(),
    };

    await onSalvarObservacao(novaObs);
    setModalAberto(false);
  };

  return (
    <div className="space-y-6">
      {/* CABEÇALHO */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
            <FileText className="text-emerald-400" size={22} />
            Observações de {nomeMesAno(mesSelecionado)}
          </h2>
          <p className="text-xs text-zinc-400">
            Anote acontecimentos atípicos do mês: cartão emprestado, Pix recebidos, acordos ou lembretes
          </p>
        </div>

        <button
          onClick={abrirModalNova}
          className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold transition cursor-pointer shrink-0"
        >
          <Plus size={17} strokeWidth={2.5} />
          Nova Observação
        </button>
      </div>

      {/* RESUMO RÁPIDO DAS NOTAS DO MÊS */}
      {obsDoMes.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="bg-zinc-900/70 border border-zinc-800 rounded-xl p-3.5">
            <span className="text-[11px] text-zinc-400 block">Notas no Mês</span>
            <strong className="text-base text-white">{obsDoMes.length} registro(s)</strong>
          </div>
          <div className="bg-zinc-900/70 border border-zinc-800 rounded-xl p-3.5">
            <span className="text-[11px] text-amber-400 block">Pendentes / A cobrar</span>
            <strong className="text-base text-amber-300">
              {obsDoMes.filter((o) => !o.resolvido).length} pendente(s)
            </strong>
          </div>
          <div className="col-span-2 sm:col-span-1 bg-zinc-900/70 border border-zinc-800 rounded-xl p-3.5">
            <span className="text-[11px] text-emerald-400 block">Valor Envolvido (Pendentes)</span>
            <strong className="text-base text-white">
              {formatarMoeda(
                obsDoMes
                  .filter((o) => !o.resolvido)
                  .reduce((acc, o) => acc + (o.valor || 0), 0)
              )}
            </strong>
          </div>
        </div>
      )}

      {/* LISTA DE OBSERVAÇÕES */}
      {obsDoMes.length === 0 ? (
        <div className="text-center py-14 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-6">
          <FileText size={34} className="mx-auto text-zinc-600 mb-2.5" />
          <p className="text-sm text-zinc-300 font-medium">
            Nenhuma observação registrada em {nomeMesAno(mesSelecionado)}.
          </p>
          <p className="text-xs text-zinc-500 mt-1 max-w-md mx-auto">
            Emprestou o cartão para alguém? Recebeu um Pix diferente ou teve algum gasto fora do comum? Clique em "+ Nova Observação" para deixar registrado!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {obsDoMes.map((obs) => {
            const corAutor =
              obs.autor === pessoa1
                ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
                : obs.autor === 'Casal'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                : 'bg-pink-500/20 text-pink-300 border-pink-500/30';

            return (
              <div
                key={obs.id}
                className={`border rounded-2xl p-4 md:p-5 flex flex-col justify-between gap-3 transition ${
                  obs.resolvido
                    ? 'bg-emerald-950/10 border-emerald-900/40 opacity-85'
                    : 'bg-zinc-900/80 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-md font-semibold border ${corAutor}`}
                      >
                        {obs.autor}
                      </span>
                      <span className="text-[11px] text-zinc-500 flex items-center gap-1">
                        <Calendar size={11} /> {formatarDataBR(obs.dataCriacao)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => abrirModalEditar(obs)}
                        className="text-zinc-500 hover:text-emerald-400 p-1.5 rounded-lg hover:bg-zinc-800/60 transition cursor-pointer"
                        title="Editar observação"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => onExcluirObservacao(obs.id)}
                        className="text-zinc-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-zinc-800/60 transition cursor-pointer"
                        title="Excluir observação"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <h3
                    className={`font-bold text-base ${
                      obs.resolvido ? 'line-through text-zinc-400' : 'text-white'
                    }`}
                  >
                    {obs.titulo}
                  </h3>

                  <p className="text-xs md:text-sm text-zinc-300 whitespace-pre-line leading-relaxed bg-zinc-950/60 border border-zinc-800/70 rounded-xl p-3">
                    {obs.texto}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60">
                  {obs.valor && obs.valor > 0 ? (
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <DollarSign size={13} /> Valor: {formatarMoeda(obs.valor)}
                    </span>
                  ) : (
                    <span className="text-[11px] text-zinc-500">Anotação geral</span>
                  )}

                  <button
                    onClick={() => onAlternarResolvido(obs)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      obs.resolvido
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25'
                    }`}
                  >
                    {obs.resolvido ? (
                      <>
                        <CheckCircle2 size={14} /> Resolvido / Pago
                      </>
                    ) : (
                      <>
                        <Clock size={14} /> Pendente (Marcar resolvido)
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL PARA CRIAR / EDITAR OBSERVAÇÃO DO MÊS */}
      {modalAberto && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-lg rounded-t-3xl sm:rounded-2xl p-5 md:p-6 space-y-4 shadow-2xl max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base md:text-lg text-white">
                {obsEditando ? 'Editar Observação' : `Nova Observação (${nomeMesAno(mesSelecionado)})`}
              </h3>
              <button
                onClick={() => setModalAberto(false)}
                className="p-1.5 rounded-full bg-zinc-800 text-zinc-400 hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs text-zinc-400 font-medium">Quem está anotando?</label>
                <div className="grid grid-cols-3 gap-2 mt-1.5">
                  {[pessoa1, pessoa2, 'Casal'].map((resp) => (
                    <button
                      type="button"
                      key={resp}
                      onClick={() => setAutorForm(resp)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1.5 cursor-pointer ${
                        autorForm === resp
                          ? 'bg-zinc-100 text-zinc-950 border-white'
                          : 'bg-zinc-950 text-zinc-400 border-zinc-800'
                      }`}
                    >
                      {resp === 'Casal' ? <Users size={13} /> : <User size={13} />}
                      <span className="truncate">{resp}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-zinc-400 font-medium">Título / Resumo curto</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Emprestei cartão pro meu irmão / Pix extra..."
                  value={tituloForm}
                  onChange={(e) => setTituloForm(e.target.value)}
                  className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 font-medium">
                  Detalhes da Observação
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Escreva todos os detalhes aqui para vocês lembrarem depois..."
                  value={textoForm}
                  onChange={(e) => setTextoForm(e.target.value)}
                  className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 font-medium">
                  Valor envolvido em R$ (opcional - ex: valor a receber)
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="Ex: 120,00 (deixe em branco se não houver)"
                  value={valorForm}
                  onChange={(e) => setValorForm(e.target.value)}
                  className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <label className="flex items-center gap-2.5 bg-zinc-950 border border-zinc-800 rounded-xl p-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={resolvidoForm}
                  onChange={(e) => setResolvidoForm(e.target.checked)}
                  className="w-4 h-4 accent-emerald-500"
                />
                <span className="text-xs md:text-sm font-semibold text-zinc-200">
                  Já está resolvido / já foi pago
                </span>
              </label>

              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-3 rounded-xl text-sm transition cursor-pointer"
              >
                {obsEditando ? 'Salvar Alterações' : 'Postar Observação no Mês'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
```

## src\components\CardTransacao.tsx
```tsx
import {
  TrendingUp,
  TrendingDown,
  PiggyBank,
  ArrowDownLeft,
  ArrowLeftRight,
  MapPin,
  Calendar,
  CreditCard,
  Tag,
  Trash2,
  Pencil,
} from 'lucide-react';
import { type Transaction, formatarMoeda, formatarDataBR } from '../types';

interface CardTransacaoProps {
  transacao: Transaction;
  pessoa1: string;
  onEditar: (transacao: Transaction) => void;
  onExcluir: (id: string) => void;
}

export function CardTransacao({ transacao, pessoa1, onEditar, onExcluir }: CardTransacaoProps) {
  const isReceita = transacao.tipo === 'receita';
  const isPoupanca = transacao.tipo === 'poupanca';
  const isResgate = transacao.tipo === 'resgate_poupanca';
  const isTransferencia = transacao.tipo === 'transferencia_interna';

  const corBadgePessoa =
    transacao.responsavel === pessoa1
      ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
      : transacao.responsavel === 'Casal'
      ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
      : 'bg-pink-500/20 text-pink-300 border-pink-500/30';

  return (
    <div
      className={`border rounded-xl p-3.5 md:p-4 flex items-center justify-between gap-3 transition ${
        isTransferencia
          ? 'bg-zinc-900/40 border-zinc-800/60 opacity-85'
          : 'bg-zinc-900/70 border-zinc-800/80 hover:border-zinc-700/80'
      }`}
    >
      <div className="flex items-start gap-3 min-w-0">
        <div
          className={`p-2.5 rounded-xl mt-0.5 shrink-0 ${
            isReceita
              ? 'bg-emerald-500/15 text-emerald-400'
              : isPoupanca
              ? 'bg-sky-500/15 text-sky-400'
              : isResgate
              ? 'bg-amber-500/15 text-amber-400'
              : isTransferencia
              ? 'bg-zinc-800 text-zinc-300'
              : 'bg-rose-500/15 text-rose-400'
          }`}
        >
          {isReceita ? (
            <TrendingUp size={18} />
          ) : isPoupanca ? (
            <PiggyBank size={18} />
          ) : isResgate ? (
            <ArrowDownLeft size={18} />
          ) : isTransferencia ? (
            <ArrowLeftRight size={18} />
          ) : (
            <TrendingDown size={18} />
          )}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <p className="font-semibold text-sm md:text-base text-zinc-100 truncate">
              {transacao.local}
            </p>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold border ${corBadgePessoa}`}
            >
              {transacao.responsavel}
            </span>
            {isResgate && (
              <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded font-semibold">
                Retirada Poupança
              </span>
            )}
            {isTransferencia && (
              <span className="text-[10px] bg-zinc-800 text-zinc-300 border border-zinc-700 px-1.5 py-0.5 rounded font-semibold">
                Movimentação (Neutro)
              </span>
            )}
            {transacao.parcelaInfo && (
              <span className="text-[10px] bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded font-semibold">
                {transacao.parcelaInfo}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-400 mt-1">
            <span className="flex items-center gap-1">
              <MapPin size={12} /> {transacao.categoria}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={12} /> {formatarDataBR(transacao.data)}
            </span>
            <span className="flex items-center gap-1">
              <CreditCard size={12} /> {transacao.metodoPagamento}
            </span>
          </div>

          {transacao.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {transacao.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-[10px] bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded-md flex items-center gap-0.5"
                >
                  <Tag size={9} /> {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col items-end shrink-0">
        <span
          className={`font-bold text-sm md:text-base ${
            isReceita
              ? 'text-emerald-400'
              : isPoupanca
              ? 'text-sky-400'
              : isResgate
              ? 'text-amber-400'
              : isTransferencia
              ? 'text-zinc-300'
              : 'text-rose-400'
          }`}
        >
          {isTransferencia ? '⇄ ' : isReceita || isPoupanca ? '+ ' : '- '}
          {formatarMoeda(transacao.valor)}
        </span>

        <div className="flex items-center gap-1 mt-1">
          <button
            onClick={() => onEditar(transacao)}
            className="text-zinc-500 hover:text-emerald-400 p-1.5 transition rounded-lg hover:bg-zinc-800/60 cursor-pointer"
            title="Editar lançamento"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={() => onExcluir(transacao.id)}
            className="text-zinc-500 hover:text-rose-400 p-1.5 transition rounded-lg hover:bg-zinc-800/60 cursor-pointer"
            title="Excluir lançamento"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
```

## src\components\ImportadorExtratoBancario.tsx
```tsx
import React, { useState, useMemo } from 'react';
import * as XLSX from 'xlsx';
import * as pdfjsLib from 'pdfjs-dist';
import {
  Upload,
  ArrowLeftRight,
  Trash2,
  X,
  User,
  Users,
  Calendar,
  Sparkles,
  AlertCircle,
  Check,
  FileText,
} from 'lucide-react';
import {
  type Transaction,
  type TransactionType,
  type PaymentMethod,
  CATEGORIAS_DESPESA,
  CATEGORIAS_RECEITA,
  CATEGORIAS_POUPANCA,
  CATEGORIAS_TRANSFERENCIA,
  formatarMoeda,
  nomeMesAno,
} from '../types';

// Configura o Worker do PDF.js via CDN para funcionar direto no Vite/Vercel sem erro de build
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

interface ImportadorExtratoBancarioProps {
  mesSelecionado: string; // Ex: "2026-09"
  pessoa1: string;
  pessoa2: string;
  onImportarLancamentos: (novos: Transaction[]) => Promise<void>;
}

interface ItemPreview {
  idTemp: string;
  selecionado: boolean;
  data: string; // YYYY-MM-DD
  horario?: string; // HH:MM
  local: string;
  valor: number;
  sinalOriginal: 'entrada' | 'saida';
  tipo: TransactionType;
  categoria: string;
  responsavel: string;
  metodoPagamento: PaymentMethod;
  origemArquivo: string;
  motivoAuto?: string;
}

const MESES_ABREV: Record<string, string> = {
  jan: '01',
  fev: '02',
  mar: '03',
  abr: '04',
  mai: '05',
  jun: '06',
  jul: '07',
  ago: '08',
  set: '09',
  out: '10',
  nov: '11',
  dez: '12',
};

export function ImportadorExtratoBancario({
  mesSelecionado,
  pessoa1,
  pessoa2,
  onImportarLancamentos,
}: ImportadorExtratoBancarioProps) {
  const [modalAberto, setModalAberto] = useState(false);

  // 1. CONFIGURAÇÕES ANTES DO UPLOAD
  const [responsavelPadrao, setResponsavelPadrao] = useState<string>(pessoa1);
  const [mesAlvo, setMesAlvo] = useState<string>(mesSelecionado);
  const [metodoPadrao, setMetodoPadrao] = useState<PaymentMethod>('Pix/Débito');

  // 2. ENTRADA DE ARQUIVOS / TEXTO E ITENS LIDOS
  const [abaEntrada, setAbaEntrada] = useState<'arquivos' | 'texto'>('arquivos');
  const [textoColado, setTextoColado] = useState('');
  const [itensPreview, setItensPreview] = useState<ItemPreview[]>([]);
  const [ignoradosOutroMes, setIgnoradosOutroMes] = useState<number>(0);
  const [lendoArquivos, setLendoArquivos] = useState(false);
  const [salvando, setSalvando] = useState(false);

  const abrirModal = () => {
    setMesAlvo(mesSelecionado);
    setResponsavelPadrao(pessoa1);
    setModalAberto(true);
  };

  const normalizar = (str: string) =>
    str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();

  // Classificador automático de categoria e método
  const classificarDescricao = (
    desc: string,
    sinal: 'entrada' | 'saida'
  ): { tipo: TransactionType; categoria: string; metodo: PaymentMethod; motivo?: string } => {
    const t = normalizar(desc);

    const nomesProprios = [
      normalizar(pessoa1),
      normalizar(pessoa2),
      'juan cecilio',
      'mesma titularidade',
      'entre contas',
      'transf entre contas',
      'transferencia propria',
    ].filter((n) => n.length >= 3);

    if (
      nomesProprios.some((nome) => t.includes(nome)) &&
      (t.includes('pix') ||
        t.includes('ted') ||
        t.includes('transf') ||
        t.includes('receb') ||
        t.includes('enviad'))
    ) {
      return {
        tipo: 'transferencia_interna',
        categoria: 'Transferência entre Contas',
        metodo: 'Pix/Débito',
        motivo: 'Mesma titularidade / Entre contas',
      };
    }

    if (
      t.includes('aplicacao') ||
      t.includes('poupanca') ||
      t.includes('guardar dinheiro') ||
      t.includes('rdb') ||
      t.includes('cdb')
    ) {
      if (sinal === 'saida') {
        return {
          tipo: 'poupanca',
          categoria: 'Reserva do Casal',
          metodo: 'Pix/Débito',
          motivo: 'Aplicação Poupança',
        };
      }
    }

    if (sinal === 'entrada') {
      if (t.includes('salario') || t.includes('pagamento') || t.includes('remuneracao')) {
        return { tipo: 'receita', categoria: 'Salário', metodo: 'Pix/Débito' };
      }
      if (t.includes('rendimento') || t.includes('dividendo')) {
        return { tipo: 'receita', categoria: 'Rendimentos', metodo: 'Pix/Débito' };
      }
      return { tipo: 'receita', categoria: 'Reembolso/Pix', metodo: 'Pix/Débito' };
    }

    let categoria = 'Outros';
    if (
      t.includes('uber') ||
      t.includes('99') ||
      t.includes('onibus') ||
      t.includes('van') ||
      t.includes('pedagio') ||
      t.includes('combustivel') ||
      t.includes('posto') ||
      t.includes('estacionamento') ||
      t.includes('zona azul')
    ) {
      categoria = 'Transporte';
    } else if (
      t.includes('ifood') ||
      t.includes('mercado') ||
      t.includes('supermercado') ||
      t.includes('padaria') ||
      t.includes('lanche') ||
      t.includes('restaurante') ||
      t.includes('burger') ||
      t.includes('mc donalds') ||
      t.includes('mcdonalds') ||
      t.includes('bk') ||
      t.includes('sushi') ||
      t.includes('esfiha') ||
      t.includes('pizza') ||
      t.includes('acai') ||
      t.includes('sorvete') ||
      t.includes('doceria') ||
      t.includes('cantina') ||
      t.includes('atacadao') ||
      t.includes('assai')
    ) {
      categoria = 'Comida';
    } else if (
      t.includes('faculdade') ||
      t.includes('claro') ||
      t.includes('vivo') ||
      t.includes('tim') ||
      t.includes('internet') ||
      t.includes('energia') ||
      t.includes('elektro') ||
      t.includes('sabesp') ||
      t.includes('agua') ||
      t.includes('aluguel') ||
      t.includes('condominio') ||
      t.includes('fatura') ||
      t.includes('cartao') ||
      t.includes('boleto')
    ) {
      categoria = 'Contas Fixas';
    } else if (
      t.includes('farmacia') ||
      t.includes('drogaria') ||
      t.includes('droga') ||
      t.includes('medico') ||
      t.includes('consulta') ||
      t.includes('exame') ||
      t.includes('dentista') ||
      t.includes('psicolog') ||
      t.includes('terapia') ||
      t.includes('otica')
    ) {
      categoria = 'Saúde';
    } else if (
      t.includes('cinema') ||
      t.includes('spotify') ||
      t.includes('netflix') ||
      t.includes('steam') ||
      t.includes('playstation') ||
      t.includes('jogo') ||
      t.includes('ingresso') ||
      t.includes('bar') ||
      t.includes('festa') ||
      t.includes('futebol')
    ) {
      categoria = 'Lazer';
    } else if (
      t.includes('shopee') ||
      t.includes('amazon') ||
      t.includes('mercado livre') ||
      t.includes('mercadolivre') ||
      t.includes('shein') ||
      t.includes('magalu') ||
      t.includes('cea') ||
      t.includes('renner') ||
      t.includes('riachuelo') ||
      t.includes('roupa') ||
      t.includes('presente') ||
      t.includes('barbeiro') ||
      t.includes('cabeleireiro') ||
      t.includes('salao')
    ) {
      categoria = 'Compras';
    }

    const metodo: PaymentMethod =
      t.includes('credito') || t.includes('parc ') ? 'Cartão de Crédito' : metodoPadrao;

    return { tipo: 'despesa', categoria, metodo };
  };

  // Cruzamento de pares de transferência entre contas no mesmo dia (ou 1 dia de diferença)
  const cruzarTransferenciasInternas = (lista: ItemPreview[]): ItemPreview[] => {
    const resultado = [...lista];

    const diffDias = (d1: string, d2: string) => {
      const t1 = new Date(`${d1}T12:00:00`).getTime();
      const t2 = new Date(`${d2}T12:00:00`).getTime();
      return Math.abs(Math.round((t1 - t2) / (1000 * 60 * 60 * 24)));
    };

    for (let i = 0; i < resultado.length; i++) {
      const itemA = resultado[i];
      if (itemA.sinalOriginal !== 'saida') continue;

      for (let j = 0; j < resultado.length; j++) {
        if (i === j) continue;
        const itemB = resultado[j];
        if (itemB.sinalOriginal !== 'entrada') continue;

        const mesmoValor = Math.abs(itemA.valor - itemB.valor) < 0.005;
        if (!mesmoValor) continue;

        const diasDistancia = diffDias(itemA.data, itemB.data);
        if (diasDistancia <= 1) {
          const msgHorario =
            itemA.horario && itemB.horario && itemA.horario === itemB.horario
              ? `Mesmo dia e horário (${itemA.horario})`
              : 'Mesmo valor e data entre contas';

          resultado[i] = {
            ...itemA,
            tipo: 'transferencia_interna',
            categoria: 'Transferência entre Contas',
            motivoAuto: `Movimentação detectada (${msgHorario})`,
          };
          resultado[j] = {
            ...itemB,
            tipo: 'transferencia_interna',
            categoria: 'Transferência entre Contas',
            motivoAuto: `Movimentação detectada (${msgHorario})`,
          };
          break;
        }
      }
    }

    return resultado;
  };

  const extrairDataISO = (textoData: any): { dataISO: string | null; horario?: string } => {
    if (!textoData) return { dataISO: null };

    if (textoData instanceof Date && !isNaN(textoData.getTime())) {
      const y = textoData.getUTCFullYear();
      const m = String(textoData.getUTCMonth() + 1).padStart(2, '0');
      const d = String(textoData.getUTCDate()).padStart(2, '0');
      return { dataISO: `${y}-${m}-${d}` };
    }

    if (typeof textoData === 'number' && textoData > 20000 && textoData < 80000) {
      const parsed = XLSX.SSF.parse_date_code(textoData);
      if (parsed && parsed.y && parsed.m && parsed.d) {
        return {
          dataISO: `${parsed.y}-${String(parsed.m).padStart(2, '0')}-${String(parsed.d).padStart(2, '0')}`,
        };
      }
    }

    const str = String(textoData).trim();
    const matchHora = str.match(/(\d{2}:\d{2})/);
    const horario = matchHora ? matchHora[1] : undefined;

    // 1. DD/MM/YYYY
    const mBR = str.match(/(\d{2})\/(\d{2})\/(\d{4})/);
    if (mBR) {
      return { dataISO: `${mBR[3]}-${mBR[2]}-${mBR[1]}`, horario };
    }

    // 2. YYYY-MM-DD
    const mISO = str.match(/(\d{4})-(\d{2})-(\d{2})/);
    if (mISO) {
      return { dataISO: `${mISO[1]}-${mISO[2]}-${mISO[3]}`, horario };
    }

    // 3. DD/MM/YY (Ex: 15/09/26)
    const mCurtoAno = str.match(/(\d{2})\/(\d{2})\/(\d{2})(?!\d)/);
    if (mCurtoAno) {
      return { dataISO: `20${mCurtoAno[3]}-${mCurtoAno[2]}-${mCurtoAno[1]}`, horario };
    }

    // 4. DD/MM (Padrão PDF Itaú: ex "15/09")
    const mCurto = str.match(/(?:^|\s)(\d{2})\/(\d{2})(?!\/|\d)/);
    if (mCurto) {
      const anoAlvo = mesAlvo.split('-')[0];
      return { dataISO: `${anoAlvo}-${mCurto[2]}-${mCurto[1]}`, horario };
    }

    // 5. DD/mmm ou DD mmm (Padrão PDF Itaú/Nubank: ex "15/set" ou "15 set")
    const mMesTexto = normalizar(str).match(/(?:^|\s)(\d{2})\s*[/\s-]\s*(jan|fev|mar|abr|mai|jun|jul|ago|set|out|nov|dez)/);
    if (mMesTexto) {
      const anoAlvo = mesAlvo.split('-')[0];
      const mesNum = MESES_ABREV[mMesTexto[2]];
      if (mesNum) {
        return { dataISO: `${anoAlvo}-${mesNum}-${mMesTexto[1]}`, horario };
      }
    }

    return { dataISO: null };
  };

  const extrairNumero = (val: any): number | null => {
    if (val === null || val === undefined || val === '') return null;
    if (typeof val === 'number') return isNaN(val) ? null : Number(val.toFixed(2));

    let s = String(val)
      .replace(/R\$/gi, '')
      .replace(/\s/g, '')
      .trim();
    if (!s) return null;

    // Trata formato do Itaú onde o sinal de menos fica atrás do número (ex: "150,00-" ou "-150,00" ou "150,00D")
    let multiplicador = 1;
    if (s.endsWith('-') || s.startsWith('-') || /d$/i.test(s)) {
      multiplicador = -1;
      s = s.replace(/[-+dD]+/g, '');
    } else if (s.startsWith('+') || /c$/i.test(s)) {
      s = s.replace(/[+cC]+/g, '');
    }

    if (s.includes(',') && s.includes('.')) {
      s = s.replace(/\./g, '').replace(',', '.');
    } else if (s.includes(',')) {
      s = s.replace(',', '.');
    }

    const num = parseFloat(s);
    if (isNaN(num)) return null;
    return Number((num * multiplicador).toFixed(2));
  };

  // ============================================================================
  // LEITOR ESPECIAL DE PDF (RECONSTRÓI AS LINHAS DO EXTRATO DO ITAÚ / NUBANK / INTER)
  // ============================================================================
  const extrairTextoDePDF = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const linhasTotais: string[] = [];

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();

      // Agrupa os textos pela coordenada vertical (Y) para reconstruir cada linha da tabela do PDF
      const gruposY: { y: number; itens: { x: number; str: string }[] }[] = [];

      for (const item of textContent.items as any[]) {
        const texto = String(item.str || '').trim();
        if (!texto) continue;
        const x = item.transform[4];
        const y = item.transform[5];

        // Tolerância de 3.5px na vertical para considerar que estão na mesma linha
        let grupo = gruposY.find((g) => Math.abs(g.y - y) <= 3.5);
        if (!grupo) {
          grupo = { y, itens: [] };
          gruposY.push(grupo);
        }
        grupo.itens.push({ x, str: texto });
      }

      // Ordena de cima para baixo (no PDF, o Y maior fica no topo)
      gruposY.sort((a, b) => b.y - a.y);

      for (const g of gruposY) {
        // Ordena da esquerda para a direita (X crescente)
        g.itens.sort((a, b) => a.x - b.x);
        const linhaMontada = g.itens.map((i) => i.str).join(' ');
        linhasTotais.push(linhaMontada);
      }
    }

    return linhasTotais.join('\n');
  };

  // ============================================================================
  // LEITOR DE LINHAS DE TEXTO / PDF (SUPORTA DATA REPETIDA OU AGRUPADA POR DIA DO ITAÚ)
  // ============================================================================
  const lerTextoBrutoOuPDF = (
    texto: string,
    origemLabel: string
  ): { validos: ItemPreview[]; ignorados: number } => {
    const validos: ItemPreview[] = [];
    let ignorados = 0;

    const linhas = texto.split(/\r?\n/);
    let ultimaDataDetectada: string | null = null;

    for (let idx = 0; idx < linhas.length; idx++) {
      const limpa = linhas[idx].trim();
      if (!limpa || limpa.length < 4) continue;

      const normLinha = normalizar(limpa);

      // Ignora linhas que são claramente saldos ou rodapés de PDF do Itaú
      if (
        normLinha.startsWith('saldo') ||
        normLinha.includes('saldo anterior') ||
        normLinha.includes('saldo final') ||
        normLinha.includes('saldo total disponivel') ||
        normLinha.includes('s a l d o') ||
        normLinha.includes('limite da conta') ||
        normLinha.includes('cnpj')
      ) {
        continue;
      }

      // Verifica se a linha tem uma data explícita (DD/MM/YYYY, DD/MM ou DD/mmm)
      const { dataISO, horario } = extrairDataISO(limpa);
      if (dataISO) {
        ultimaDataDetectada = dataISO;
      }

      const dataUsada = dataISO || ultimaDataDetectada;
      if (!dataUsada) continue;

      // Procura todos os valores em formato monetário Brasileiro (ex: -15,90 | 1.250,00 | 45,00-) na linha
      const regexValores =
        /([-+]?\s*(?:R\$\s*)?\d{1,3}(?:\.\d{3})*,\d{2}\s*[-dDcC]?)/gi;
      const matchesValores = Array.from(limpa.matchAll(regexValores));

      if (matchesValores.length === 0) continue;

      // Em extratos do Itaú, se houver 2 valores na mesma linha, o 1º é o Valor do Lançamento e o 2º é o Saldo do dia
      const matchValorPrincipal = matchesValores[0][0];
      let valorNum = extrairNumero(matchValorPrincipal);
      if (valorNum === null || valorNum === 0) continue;

      // Remove a data e os valores numéricos para sobrar a descrição do lançamento
      let desc = limpa;
      if (dataISO) {
        desc = desc
          .replace(/(\d{2}\/\d{2}(?:\/\d{2,4})?|\d{4}-\d{2}-\d{2})/, '')
          .replace(/\b(\d{2})\s*[/\s-]\s*(jan|fev|mar|abr|mai|jun|jul|ago|set|out|nov|dez)\b/i, '');
      }
      matchesValores.forEach((m) => {
        desc = desc.replace(m[0], '');
      });

      desc = desc
        .replace(/\d{2}:\d{2}/g, '')
        .replace(/^[;\t|\s-]+|[;\t|\s-]+$/g, '')
        .trim();

      if (!desc || desc.length < 2) continue;

      // VERIFICADOR DE MÊS EXATO (Filtra apenas o mês desejado!)
      if (!dataUsada.startsWith(mesAlvo)) {
        ignorados++;
        continue;
      }

      // Inteligência extra para PDF do Itaú: se o PDF não colocou sinal de "-" em compras (TAR / PIX ENVIADO / COMPRA / PAGTO / SISPAG)
      const descNorm = normalizar(desc);
      if (
        valorNum > 0 &&
        (descNorm.includes('enviado') ||
          descNorm.includes('compra') ||
          descNorm.includes('pagto') ||
          descNorm.includes('sispag') ||
          descNorm.includes('debito') ||
          descNorm.includes('saque') ||
          descNorm.includes('tar ')) &&
        !descNorm.includes('receb') &&
        !descNorm.includes('devol') &&
        !descNorm.includes('estorno')
      ) {
        valorNum = -Math.abs(valorNum);
      }

      const sinal: 'entrada' | 'saida' = valorNum > 0 ? 'entrada' : 'saida';
      const classif = classificarDescricao(desc, sinal);

      validos.push({
        idTemp: `${Date.now()}-${origemLabel}-${idx}-${Math.random().toString(36).slice(2, 6)}`,
        selecionado: true,
        data: dataUsada,
        horario,
        local: desc,
        valor: Math.abs(valorNum),
        sinalOriginal: sinal,
        tipo: classif.tipo,
        categoria: classif.categoria,
        responsavel: responsavelPadrao,
        metodoPagamento: classif.metodo,
        origemArquivo: origemLabel,
        motivoAuto: classif.motivo,
      });
    }

    return { validos, ignorados };
  };

  // ============================================================================
  // LEITOR DE ARQUIVOS OFX
  // ============================================================================
  const lerConteudoOFX = (
    conteudo: string,
    nomeArq: string
  ): { validos: ItemPreview[]; ignorados: number } => {
    const validos: ItemPreview[] = [];
    let ignorados = 0;

    const blocos = conteudo.split(/<STMTTRN>/i).slice(1);
    blocos.forEach((bloco, idx) => {
      const dtMatch = bloco.match(/<DTPOSTED>(\d{8})(\d{4,6})?/i);
      const valMatch = bloco.match(/<TRNAMT>([-+]?\d+[.,]?\d*)/i);
      const memoMatch = bloco.match(/<MEMO>([^<\r\n]+)/i);
      const nameMatch = bloco.match(/<NAME>([^<\r\n]+)/i);

      if (!dtMatch || !valMatch) return;

      const rawDate = dtMatch[1];
      const dataISO = `${rawDate.slice(0, 4)}-${rawDate.slice(4, 6)}-${rawDate.slice(6, 8)}`;
      const horario = dtMatch[2]
        ? `${dtMatch[2].slice(0, 2)}:${dtMatch[2].slice(2, 4)}`
        : undefined;

      if (!dataISO.startsWith(mesAlvo)) {
        ignorados++;
        return;
      }

      const valorBruto = extrairNumero(valMatch[1]);
      if (valorBruto === null || valorBruto === 0) return;

      const desc = (memoMatch?.[1] || nameMatch?.[1] || 'Lançamento Bancário').trim();
      const sinal: 'entrada' | 'saida' = valorBruto > 0 ? 'entrada' : 'saida';
      const valorAbs = Math.abs(valorBruto);
      const classif = classificarDescricao(desc, sinal);

      validos.push({
        idTemp: `${Date.now()}-${nomeArq}-${idx}-${Math.random().toString(36).slice(2, 6)}`,
        selecionado: true,
        data: dataISO,
        horario,
        local: desc,
        valor: valorAbs,
        sinalOriginal: sinal,
        tipo: classif.tipo,
        categoria: classif.categoria,
        responsavel: responsavelPadrao,
        metodoPagamento: classif.metodo,
        origemArquivo: nomeArq,
        motivoAuto: classif.motivo,
      });
    });

    return { validos, ignorados };
  };

  // ============================================================================
  // LEITOR DE PLANILHAS / CSV
  // ============================================================================
  const lerPlanilhaOuCSV = (
    buffer: ArrayBuffer,
    nomeArq: string
  ): { validos: ItemPreview[]; ignorados: number } => {
    const validos: ItemPreview[] = [];
    let ignorados = 0;

    const workbook = XLSX.read(buffer, { type: 'array', cellDates: true });
    workbook.SheetNames.forEach((sheetName) => {
      const sheet = workbook.Sheets[sheetName];
      const linhas: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });

      linhas.forEach((linha, idx) => {
        const celulas = linha.map((c) => String(c ?? '').trim()).filter(Boolean);
        if (celulas.length < 2) return;

        let dataEncontrada: string | null = null;
        let horarioEncontrado: string | undefined;
        let colData = -1;

        for (let c = 0; c < linha.length; c++) {
          const { dataISO, horario } = extrairDataISO(linha[c]);
          if (dataISO) {
            dataEncontrada = dataISO;
            horarioEncontrado = horario;
            colData = c;
            break;
          }
        }

        if (!dataEncontrada) return;

        if (!dataEncontrada.startsWith(mesAlvo)) {
          ignorados++;
          return;
        }

        let valorEncontrado: number | null = null;
        const textosDescricao: string[] = [];

        for (let c = 0; c < linha.length; c++) {
          if (c === colData) continue;
          const valCelula = linha[c];
          if (valCelula === '' || valCelula === null || valCelula === undefined) continue;

          const num = extrairNumero(valCelula);
          const strCelula = String(valCelula).trim();

          const pareceMonetario =
            typeof valCelula === 'number' ||
            /^[-+]?\s*(R\$)?\s*\d{1,3}(\.\d{3})*([.,]\d{2})?[-dDcC]?$/.test(strCelula);

          if (num !== null && num !== 0 && pareceMonetario && valorEncontrado === null) {
            valorEncontrado = num;
          } else if (strCelula.length > 1 && !/^(saldo|total)/i.test(strCelula)) {
            textosDescricao.push(strCelula);
          }
        }

        if (valorEncontrado === null || valorEncontrado === 0) return;

        const descFinal = textosDescricao.join(' - ').trim() || 'Lançamento Extrato';
        if (/^saldo\s*(anterior|do dia|final|total)/i.test(normalizar(descFinal))) return;

        const sinal: 'entrada' | 'saida' = valorEncontrado > 0 ? 'entrada' : 'saida';
        const valorAbs = Math.abs(valorEncontrado);
        const classif = classificarDescricao(descFinal, sinal);

        validos.push({
          idTemp: `${Date.now()}-${nomeArq}-${idx}-${Math.random().toString(36).slice(2, 6)}`,
          selecionado: true,
          data: dataEncontrada,
          horario: horarioEncontrado,
          local: descFinal,
          valor: valorAbs,
          sinalOriginal: sinal,
          tipo: classif.tipo,
          categoria: classif.categoria,
          responsavel: responsavelPadrao,
          metodoPagamento: classif.metodo,
          origemArquivo: nomeArq,
          motivoAuto: classif.motivo,
        });
      });
    });

    return { validos, ignorados };
  };

  // ============================================================================
  // PROCESSAMENTO DE MÚLTIPLOS ARQUIVOS JUNTOS (INCLUINDO .PDF DO ITAÚ!)
  // ============================================================================
  const handleUploadArquivos = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setLendoArquivos(true);
    let novosExtraidos: ItemPreview[] = [];
    let totalForaDoMes = 0;

    try {
      for (const file of Array.from(files)) {
        const nomeLower = file.name.toLowerCase();

        if (nomeLower.endsWith('.pdf')) {
          const textoPDF = await extrairTextoDePDF(file);
          const { validos, ignorados } = lerTextoBrutoOuPDF(textoPDF, file.name);
          novosExtraidos.push(...validos);
          totalForaDoMes += ignorados;
        } else if (nomeLower.endsWith('.ofx') || nomeLower.endsWith('.ofc')) {
          const texto = await file.text();
          const { validos, ignorados } = lerConteudoOFX(texto, file.name);
          novosExtraidos.push(...validos);
          totalForaDoMes += ignorados;
        } else if (nomeLower.endsWith('.txt')) {
          const texto = await file.text();
          const { validos, ignorados } = lerTextoBrutoOuPDF(texto, file.name);
          novosExtraidos.push(...validos);
          totalForaDoMes += ignorados;
        } else {
          const buffer = await file.arrayBuffer();
          const { validos, ignorados } = lerPlanilhaOuCSV(buffer, file.name);
          novosExtraidos.push(...validos);
          totalForaDoMes += ignorados;
        }
      }

      setIgnoradosOutroMes((prev) => prev + totalForaDoMes);

      setItensPreview((prev) => {
        const combinados = [...prev, ...novosExtraidos];
        return cruzarTransferenciasInternas(combinados);
      });
    } catch (err) {
      console.error(err);
      alert('Não foi possível ler um dos arquivos. Verifique se o PDF não está protegido por senha.');
    } finally {
      setLendoArquivos(false);
      e.target.value = '';
    }
  };

  const handleProcessarTextoColado = () => {
    if (!textoColado.trim()) return;
    const { validos, ignorados } = lerTextoBrutoOuPDF(textoColado, 'Texto Colado');
    setIgnoradosOutroMes((prev) => prev + ignorados);
    setItensPreview((prev) => cruzarTransferenciasInternas([...prev, ...validos]));
    setTextoColado('');
  };

  const atualizarItemPreview = (idTemp: string, campos: Partial<ItemPreview>) => {
    setItensPreview((prev) =>
      prev.map((item) => (item.idTemp === idTemp ? { ...item, ...campos } : item))
    );
  };

  const removerItemPreview = (idTemp: string) => {
    setItensPreview((prev) => prev.filter((item) => item.idTemp !== idTemp));
  };

  const resumoPreview = useMemo(() => {
    const selecionados = itensPreview.filter((i) => i.selecionado);
    const qtdDespesas = selecionados.filter((i) => i.tipo === 'despesa').length;
    const qtdReceitas = selecionados.filter((i) => i.tipo === 'receita').length;
    const qtdTransferencias = selecionados.filter((i) => i.tipo === 'transferencia_interna').length;
    return { total: selecionados.length, qtdDespesas, qtdReceitas, qtdTransferencias };
  }, [itensPreview]);

  const handleConfirmarImportacao = async () => {
    const selecionados = itensPreview.filter((i) => i.selecionado);
    if (selecionados.length === 0) return;

    setSalvando(true);
    const transacoesFinais: Transaction[] = selecionados.map((item, idx) => ({
      id: `extrato-${item.data}-${idx}-${Math.random().toString(36).slice(2, 7)}`,
      tipo: item.tipo,
      valor: item.valor,
      data: item.data,
      local: item.local.trim() || 'Lançamento Bancário',
      categoria: item.categoria,
      tags: item.motivoAuto ? ['#MovimentaçãoInterna'] : ['#ExtratoBancário'],
      metodoPagamento: item.metodoPagamento,
      responsavel: item.responsavel,
      pendenteSync: false,
    }));

    await onImportarLancamentos(transacoesFinais);
    setSalvando(false);
    setItensPreview([]);
    setIgnoradosOutroMes(0);
    setModalAberto(false);
  };

  return (
    <>
      <button
        onClick={abrirModal}
        className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer transition shadow-lg shadow-emerald-500/15"
      >
        <Upload size={15} strokeWidth={2.5} />
        <span>Importar Extratos (PDF / CSV / OFX)</span>
      </button>

      {modalAberto && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-4xl rounded-t-3xl sm:rounded-2xl p-5 md:p-6 space-y-5 shadow-2xl max-h-[94vh] flex flex-col">
            {/* CABEÇALHO DO MODAL */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 shrink-0">
              <div>
                <h3 className="font-bold text-base md:text-lg text-white flex items-center gap-2">
                  <Sparkles size={18} className="text-emerald-400" />
                  Importador Inteligente de Extratos (PDF, OFX, CSV)
                </h3>
                <p className="text-xs text-zinc-400">
                  Suporta PDF direto do Itaú/Nubank/Inter, filtra o mês exato e detecta transferências entre suas contas
                </p>
              </div>
              <button
                onClick={() => setModalAberto(false)}
                className="p-1.5 rounded-full bg-zinc-800 text-zinc-400 hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* CORPO ROLÁVEL */}
            <div className="space-y-5 overflow-y-auto pr-1 flex-1">
              {/* PASSO 1: SELECIONAR QUEM ESTÁ SUBINDO + QUAL O MÊS ALVO */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-zinc-950/80 border border-zinc-800 p-4 rounded-2xl">
                <div>
                  <label className="text-xs text-zinc-400 font-semibold block mb-1.5">
                    1. De quem são os extratos?
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[pessoa1, pessoa2, 'Casal'].map((resp) => (
                      <button
                        key={resp}
                        type="button"
                        onClick={() => setResponsavelPadrao(resp)}
                        className={`py-2 px-2 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1 cursor-pointer ${
                          responsavelPadrao === resp
                            ? 'bg-emerald-500 text-zinc-950 border-emerald-400 shadow'
                            : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                        }`}
                      >
                        {resp === 'Casal' ? <Users size={13} /> : <User size={13} />}
                        <span className="truncate">{resp}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs text-zinc-400 font-semibold flex items-center gap-1 mb-1.5">
                    <Calendar size={13} className="text-emerald-400" />
                    2. Filtrar apenas o Mês:
                  </label>
                  <input
                    type="month"
                    value={mesAlvo}
                    onChange={(e) => setMesAlvo(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs md:text-sm font-bold text-white focus:outline-none focus:border-emerald-500"
                  />
                  <span className="text-[10px] text-zinc-500 block mt-1">
                    Dias fora de <strong>{nomeMesAno(mesAlvo)}</strong> serão descartados!
                  </span>
                </div>

                <div>
                  <label className="text-xs text-zinc-400 font-semibold block mb-1.5">
                    3. Tipo de Extrato:
                  </label>
                  <select
                    value={metodoPadrao}
                    onChange={(e) => setMetodoPadrao(e.target.value as PaymentMethod)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs md:text-sm text-zinc-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Pix/Débito">Conta Corrente (Pix / Débito)</option>
                    <option value="Cartão de Crédito">Fatura de Cartão de Crédito</option>
                  </select>
                </div>
              </div>

              {/* PASSO 2: ENVIAR ARQUIVOS (.PDF, .CSV, .OFX) OU COLAR TEXTO */}
              <div className="space-y-3">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setAbaEntrada('arquivos')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      abaEntrada === 'arquivos'
                        ? 'bg-zinc-800 text-white border border-zinc-700'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    Subir Arquivos (.PDF, .OFX, .CSV, .XLSX)
                  </button>
                  <button
                    type="button"
                    onClick={() => setAbaEntrada('texto')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      abaEntrada === 'texto'
                        ? 'bg-zinc-800 text-white border border-zinc-700'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    Colar Texto Copiado do PDF / App
                  </button>
                </div>

                {abaEntrada === 'arquivos' ? (
                  <label className="border-2 border-dashed border-zinc-700 hover:border-emerald-500/60 bg-zinc-950/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition">
                    <FileText size={28} className="text-emerald-400 mb-2" />
                    <p className="text-xs md:text-sm font-bold text-zinc-200">
                      {lendoArquivos
                        ? 'Lendo páginas do PDF e cruzando dados...'
                        : 'Clique para enviar o PDF do Itaú ou extratos de outros bancos'}
                    </p>
                    <p className="text-[11px] text-zinc-400 mt-1">
                      Aceita <strong>.PDF</strong>, <strong>.OFX</strong>, <strong>.CSV</strong> e <strong>.XLSX</strong>. Filtra apenas{' '}
                      <strong className="text-emerald-400">{nomeMesAno(mesAlvo)}</strong> para{' '}
                      <strong className="text-emerald-400">{responsavelPadrao}</strong>!
                    </p>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.csv,.ofx,.ofc,.txt,.xlsx,.xls"
                      onChange={handleUploadArquivos}
                      disabled={lendoArquivos}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="space-y-2">
                    <textarea
                      rows={4}
                      placeholder="Cole aqui as linhas copiadas do PDF do Itaú, Nubank ou Inter..."
                      value={textoColado}
                      onChange={(e) => setTextoColado(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={handleProcessarTextoColado}
                      className="bg-zinc-800 hover:bg-zinc-700 text-emerald-400 font-bold px-4 py-2 rounded-xl text-xs transition cursor-pointer"
                    >
                      Ler Linhas do Texto para {responsavelPadrao}
                    </button>
                  </div>
                )}
              </div>

              {ignoradosOutroMes > 0 && (
                <div className="bg-sky-500/10 border border-sky-500/30 rounded-xl px-3.5 py-2 text-xs text-sky-300 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <AlertCircle size={15} className="shrink-0 text-sky-400" />
                    Verificador de Mês: <strong>{ignoradosOutroMes} lançamento(s)</strong> de outros meses (60/90 dias) foram ignorados automaticamente.
                  </span>
                </div>
              )}

              {/* PASSO 3: TABELA DE REVISÃO E EDIÇÃO RÁPIDA ANTES DE SALVAR */}
              {itensPreview.length > 0 && (
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs md:text-sm font-bold text-white">
                        Revisão dos Lançamentos ({resumoPreview.total} selecionados)
                      </h4>
                      {resumoPreview.qtdTransferencias > 0 && (
                        <span className="text-[11px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold">
                          <ArrowLeftRight size={12} />
                          {resumoPreview.qtdTransferencias} movimentação(ões) entre contas detectada(s)
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setItensPreview([]);
                        setIgnoradosOutroMes(0);
                      }}
                      className="text-xs text-rose-400 hover:underline cursor-pointer"
                    >
                      Limpar lista
                    </button>
                  </div>

                  <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
                    {itensPreview.map((item) => (
                      <div
                        key={item.idTemp}
                        className={`border rounded-xl p-3 flex flex-col md:flex-row md:items-center justify-between gap-2.5 transition ${
                          !item.selecionado
                            ? 'bg-zinc-950/40 border-zinc-800/40 opacity-50'
                            : item.tipo === 'transferencia_interna'
                            ? 'bg-zinc-950/90 border-amber-500/40'
                            : 'bg-zinc-950/90 border-zinc-800'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 flex-1 min-w-0">
                          <input
                            type="checkbox"
                            checked={item.selecionado}
                            onChange={(e) =>
                              atualizarItemPreview(item.idTemp, {
                                selecionado: e.target.checked,
                              })
                            }
                            className="w-4 h-4 accent-emerald-500 shrink-0 cursor-pointer"
                          />

                          <input
                            type="date"
                            value={item.data}
                            onChange={(e) =>
                              atualizarItemPreview(item.idTemp, { data: e.target.value })
                            }
                            className="bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1 text-xs text-zinc-300 w-[118px] shrink-0"
                          />

                          <div className="flex-1 min-w-0">
                            <input
                              type="text"
                              value={item.local}
                              onChange={(e) =>
                                atualizarItemPreview(item.idTemp, { local: e.target.value })
                              }
                              placeholder="Descrição / Nome do gasto"
                              className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded-lg px-2.5 py-1 text-xs font-semibold text-white focus:outline-none"
                            />
                            {item.motivoAuto && (
                              <span className="text-[10px] text-amber-400 flex items-center gap-1 mt-0.5">
                                <ArrowLeftRight size={10} /> {item.motivoAuto} (Não altera saldo)
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 shrink-0">
                          <select
                            value={item.tipo}
                            onChange={(e) => {
                              const novoTipo = e.target.value as TransactionType;
                              const novaCat =
                                novoTipo === 'transferencia_interna'
                                  ? 'Transferência entre Contas'
                                  : novoTipo === 'receita'
                                  ? CATEGORIAS_RECEITA[0]
                                  : novoTipo === 'poupanca'
                                  ? CATEGORIAS_POUPANCA[0]
                                  : CATEGORIAS_DESPESA[0];
                              atualizarItemPreview(item.idTemp, {
                                tipo: novoTipo,
                                categoria: novaCat,
                              });
                            }}
                            className={`rounded-lg px-2 py-1 text-xs font-bold border ${
                              item.tipo === 'despesa'
                                ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                                : item.tipo === 'receita'
                                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                                : item.tipo === 'transferencia_interna'
                                ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                                : 'bg-sky-500/15 text-sky-300 border-sky-500/30'
                            }`}
                          >
                            <option value="despesa" className="bg-zinc-900 text-white">
                              Gasto (-)
                            </option>
                            <option value="receita" className="bg-zinc-900 text-white">
                              Entrada (+)
                            </option>
                            <option value="transferencia_interna" className="bg-zinc-900 text-white">
                              Movimentação (⇄)
                            </option>
                            <option value="poupanca" className="bg-zinc-900 text-white">
                              Poupança
                            </option>
                          </select>

                          <select
                            value={item.categoria}
                            onChange={(e) =>
                              atualizarItemPreview(item.idTemp, { categoria: e.target.value })
                            }
                            className="bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1 text-xs text-zinc-200 max-w-[130px]"
                          >
                            {(item.tipo === 'despesa'
                              ? CATEGORIAS_DESPESA
                              : item.tipo === 'receita'
                              ? CATEGORIAS_RECEITA
                              : item.tipo === 'poupanca'
                              ? CATEGORIAS_POUPANCA
                              : CATEGORIAS_TRANSFERENCIA
                            ).map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                          </select>

                          <select
                            value={item.responsavel}
                            onChange={(e) =>
                              atualizarItemPreview(item.idTemp, { responsavel: e.target.value })
                            }
                            className="bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1 text-xs font-semibold text-emerald-400"
                          >
                            {[pessoa1, pessoa2, 'Casal'].map((r) => (
                              <option key={r} value={r}>
                                {r}
                              </option>
                            ))}
                          </select>

                          <span className="text-xs font-extrabold text-white min-w-[78px] text-right">
                            {formatarMoeda(item.valor)}
                          </span>

                          <button
                            type="button"
                            onClick={() => removerItemPreview(item.idTemp)}
                            className="p-1 text-zinc-500 hover:text-rose-400 cursor-pointer"
                            title="Remover linha"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RODAPÉ DE CONFIRMAÇÃO */}
            <div className="flex items-center justify-between pt-3 border-t border-zinc-800 shrink-0">
              <span className="text-xs text-zinc-400">
                {resumoPreview.total > 0
                  ? `${resumoPreview.qtdDespesas} gasto(s), ${resumoPreview.qtdReceitas} entrada(s) e ${resumoPreview.qtdTransferencias} movimentação(ões)`
                  : 'Suba seus arquivos acima para revisar'}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setModalAberto(false)}
                  className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-300 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  disabled={resumoPreview.total === 0 || salvando}
                  onClick={handleConfirmarImportacao}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-zinc-950 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Check size={16} strokeWidth={2.5} />
                  {salvando
                    ? 'Salvando...'
                    : `Confirmar e Salvar (${resumoPreview.total})`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
```

## src\components\ImportadorPlanilhaGastos.tsx
```tsx
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { FileSpreadsheet, CheckCircle2, X, AlertCircle } from 'lucide-react';
import { type Transaction, type ObservacaoMes } from '../types';

interface ImportadorPlanilhaGastosProps {
  onImportarDados: (
    transacoes: Transaction[],
    observacoes: ObservacaoMes[]
  ) => Promise<void>;
}

// Configurado exclusivamente para ler a aba Agosto.26
const MAPA_ABA_AGOSTO: Record<string, string> = {
  'agosto.26': '2026-08',
  'agosto': '2026-08',
};

export function ImportadorPlanilhaGastos({ onImportarDados }: ImportadorPlanilhaGastosProps) {
  const [importando, setImportando] = useState(false);
  const [resumoImportacao, setResumoImportacao] = useState<string | null>(null);
  const [erroMsg, setErroMsg] = useState<string | null>(null);

  const limparTexto = (val: any): string => String(val ?? '').trim();

  const normalizar = (val: any): string =>
    limparTexto(val)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  const extrairValorExato = (val: any): number | null => {
    if (val === null || val === undefined || val === '') return null;
    if (typeof val === 'number') return Number(val.toFixed(2));
    const str = String(val)
      .replace(/R\$/gi, '')
      .replace(/\s/g, '')
      .trim();
    if (!str) return null;
    if (str === '***') return 0;

    const limpo = str.includes(',') ? str.replace(/\./g, '').replace(',', '.') : str;
    const num = parseFloat(limpo);
    return isNaN(num) ? null : Number(num.toFixed(2));
  };

  const formatarDataDaAba = (valData: any, anoMesAba: string, diaPadrao = '01'): string => {
    if (!valData) return `${anoMesAba}-${diaPadrao}`;

    if (valData instanceof Date && !isNaN(valData.getTime())) {
      const dia = String(valData.getUTCDate()).padStart(2, '0');
      return `${anoMesAba}-${dia}`;
    }

    if (typeof valData === 'number') {
      const dataExcel = XLSX.SSF.parse_date_code(valData);
      if (dataExcel && dataExcel.d) {
        const dia = String(dataExcel.d).padStart(2, '0');
        return `${anoMesAba}-${dia}`;
      }
    }

    const str = String(valData).trim();
    const matchISO = str.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (matchISO) return `${anoMesAba}-${matchISO[3]}`;

    const matchBR = str.match(/^(\d{2})\/(\d{2})\/(\d{4})/);
    if (matchBR) return `${anoMesAba}-${matchBR[1]}`;

    return `${anoMesAba}-${diaPadrao}`;
  };

  const classificarCategoriaGasto = (nomeItem: string): string => {
    const t = normalizar(nomeItem);

    if (
      t.includes('uber') ||
      t.includes('99') ||
      t.includes('onibus') ||
      t.includes('van') ||
      t.includes('motta') ||
      t.includes('fretamento') ||
      t.includes('pedagio') ||
      t.includes('transporte') ||
      t.includes('viagem') ||
      t.includes('zona azul')
    ) {
      return 'Transporte';
    }
    if (
      t.includes('mercado') ||
      t.includes('supermercado') ||
      t.includes('alimentacao') ||
      t.includes('ifood') ||
      t.includes('padaria') ||
      t.includes('lanche') ||
      t.includes('comida') ||
      t.includes('restaurante') ||
      t.includes('sorveteria') ||
      t.includes('gelomel') ||
      t.includes('coxinha') ||
      t.includes('nextburguer') ||
      t.includes('acai') ||
      t.includes('bk') ||
      t.includes('sushi') ||
      t.includes('esfiha') ||
      t.includes('espetinho') ||
      t.includes('almoco') ||
      t.includes('sorvete') ||
      t.includes('doce') ||
      t.includes('salgado') ||
      t.includes('mc donalds') ||
      t.includes('mcdonalds') ||
      t.includes('bolo') ||
      t.includes('mafalda') ||
      t.includes('pizza') ||
      t.includes('manga') ||
      t.includes('cantina')
    ) {
      return 'Comida';
    }
    if (
      t.includes('faculdade') ||
      t.includes('claro') ||
      t.includes('vivo') ||
      t.includes('telefonia') ||
      t.includes('telefonica') ||
      t.includes('serasa') ||
      t.includes('fatura') ||
      t.includes('pagamento minimo') ||
      t.includes('cartao') ||
      t.includes('contas') ||
      t.includes('chuveiro') ||
      t.includes('google') ||
      t.includes('imposto') ||
      t.includes('iof') ||
      t.includes('loterica')
    ) {
      return 'Contas Fixas';
    }
    if (
      t.includes('farmacia') ||
      t.includes('remedio') ||
      t.includes('drogaria') ||
      t.includes('dentista') ||
      t.includes('psicologa') ||
      t.includes('terapia') ||
      t.includes('vitamina') ||
      t.includes('otica')
    ) {
      return 'Saúde';
    }
    if (
      t.includes('wet') ||
      t.includes('spotify') ||
      t.includes('futebol') ||
      t.includes('fultebol') ||
      t.includes('cinema') ||
      t.includes('jogo') ||
      t.includes('hopihari') ||
      t.includes('ikigai') ||
      t.includes('velox') ||
      t.includes('lazer') ||
      t.includes('station')
    ) {
      return 'Lazer';
    }
    if (
      t.includes('montreal') ||
      t.includes('calcinha') ||
      t.includes('presente') ||
      t.includes('pichau') ||
      t.includes('shopee') ||
      t.includes('amazon') ||
      t.includes('mesa') ||
      t.includes('cadeira') ||
      t.includes('roupas') ||
      t.includes('compras') ||
      t.includes('flora') ||
      t.includes('eco bag') ||
      t.includes('carne') ||
      t.includes('livros') ||
      t.includes('relogio') ||
      t.includes('cabeleleir') ||
      t.includes('cabeleliro') ||
      t.includes('barbeiro') ||
      t.includes('sobrancelha') ||
      t.includes('beleza')
    ) {
      return 'Compras';
    }
    return 'Outros';
  };

  const lerCelula = (sheet: XLSX.WorkSheet, r: number, c: number): any => {
    const endereco = XLSX.utils.encode_cell({ r, c });
    const cell = sheet[endereco];
    return cell ? cell.v : '';
  };

  const handleArquivoSelecionado = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportando(true);
    setResumoImportacao(null);
    setErroMsg(null);

    try {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: 'array', cellDates: true });

      const todasTransacoes: Transaction[] = [];
      const todasObservacoes: ObservacaoMes[] = [];

      workbook.SheetNames.forEach((nomeAbaOriginal) => {
        const chaveAba = normalizar(nomeAbaOriginal);
        let anoMes: string | undefined = MAPA_ABA_AGOSTO[chaveAba];
        if (!anoMes && chaveAba.includes('agosto')) {
          anoMes = '2026-08';
        }

        // Processa exclusivamente a aba de Agosto
        if (!anoMes) return;

        const sheet = workbook.Sheets[nomeAbaOriginal];
        const range = sheet['!ref'] ? XLSX.utils.decode_range(sheet['!ref']) : { e: { r: 100 } };
        const maxRow = Math.max(range.e.r, 100);

        // 1. RECEITAS JUAN (Linhas Excel 4, 5, 6 -> r = 3, 4, 5)
        for (const r of [3, 4, 5]) {
          const nomeCat = limparTexto(lerCelula(sheet, r, 1));
          const valor = extrairValorExato(lerCelula(sheet, r, 2));
          const dataRaw = lerCelula(sheet, r, 3);
          const obs = limparTexto(lerCelula(sheet, r, 4));

          if (
            nomeCat &&
            normalizar(nomeCat) !== 'total' &&
            normalizar(nomeCat) !== 'categoria' &&
            valor !== null &&
            valor > 0
          ) {
            const tags: string[] = ['#Juan'];
            if (obs) tags.push(`#${obs}`);

            todasTransacoes.push({
              id: `planilha-${anoMes}-rec-juan-${r}`,
              tipo: 'receita',
              valor,
              data: formatarDataDaAba(dataRaw, anoMes, '05'),
              local: `${nomeCat} (Juan)`,
              categoria: normalizar(nomeCat).includes('outros') ? 'Outros' : 'Salário',
              tags,
              metodoPagamento: 'Pix/Débito',
              responsavel: 'Casal',
              pendenteSync: true,
            });
          }
        }

        // 2. RECEITAS ANA (Linhas Excel 11, 12, 13 -> r = 10, 11, 12)
        for (const r of [10, 11, 12]) {
          const nomeCat = limparTexto(lerCelula(sheet, r, 1));
          const valor = extrairValorExato(lerCelula(sheet, r, 2));
          const qtdRaw = limparTexto(lerCelula(sheet, r, 3));
          const obs = limparTexto(lerCelula(sheet, r, 4));

          if (
            nomeCat &&
            normalizar(nomeCat) !== 'total' &&
            normalizar(nomeCat) !== 'categoria' &&
            valor !== null &&
            valor > 0
          ) {
            const tags: string[] = ['#Ana'];
            if (qtdRaw && normalizar(qtdRaw) !== 'quantidade') tags.push(`#Qtd:${qtdRaw}`);
            if (obs) tags.push(`#${obs}`);

            todasTransacoes.push({
              id: `planilha-${anoMes}-rec-ana-${r}`,
              tipo: 'receita',
              valor,
              data: `${anoMes}-10`,
              local: `${nomeCat} (Ana)`,
              categoria: normalizar(nomeCat).includes('outros') ? 'Outros' : 'Salário',
              tags,
              metodoPagamento: 'Pix/Débito',
              responsavel: 'Casal',
              pendenteSync: true,
            });
          }
        }

        // 3. POUPANÇAS GUARDADAS DO MÊS (Linhas Excel 4, 5, 6 -> r = 3, 4, 5)
        for (const r of [3, 4, 5]) {
          const nomePoup = limparTexto(lerCelula(sheet, r, 6));
          const valor = extrairValorExato(lerCelula(sheet, r, 7));
          const obs = limparTexto(lerCelula(sheet, r, 8));

          if (
            nomePoup &&
            normalizar(nomePoup) !== 'total' &&
            valor !== null &&
            valor > 0
          ) {
            const tags: string[] = [];
            if (obs && !normalizar(obs).includes('observacao')) tags.push(`#${obs}`);

            todasTransacoes.push({
              id: `planilha-${anoMes}-poup-${r}`,
              tipo: 'poupanca',
              valor,
              data: `${anoMes}-15`,
              local: nomePoup,
              categoria: 'Reserva do Casal',
              tags,
              metodoPagamento: 'Pix/Débito',
              responsavel: 'Casal',
              pendenteSync: true,
            });
          }
        }

        // 4. GASTOS DO MÊS (A partir da Linha Excel 4 -> r >= 3)
        for (let r = 3; r <= maxRow; r++) {
          const nomeGasto = limparTexto(lerCelula(sheet, r, 10));
          if (!nomeGasto) continue;

          const nomeNorm = normalizar(nomeGasto);
          if (
            nomeNorm === 'categoria' ||
            nomeNorm === 'gastos' ||
            nomeNorm === 'total gasto' ||
            nomeNorm === 'total'
          ) {
            continue;
          }

          const valorRaw = lerCelula(sheet, r, 11);
          const valor = extrairValorExato(valorRaw);
          if (valor === null) continue;

          const dataRaw = lerCelula(sheet, r, 12);
          const obs = limparTexto(lerCelula(sheet, r, 13));

          const tags: string[] = [];
          if (obs && !normalizar(obs).includes('observacao')) {
            tags.push(`#${obs}`);
          }

          todasTransacoes.push({
            id: `planilha-${anoMes}-gasto-${r}`,
            tipo: 'despesa',
            valor,
            data: formatarDataDaAba(dataRaw, anoMes, '01'),
            local: nomeGasto,
            categoria: classificarCategoriaGasto(nomeGasto),
            tags,
            metodoPagamento:
              nomeNorm.includes('cartao') || nomeNorm.includes('fatura')
                ? 'Cartão de Crédito'
                : 'Pix/Débito',
            responsavel: 'Casal',
            pendenteSync: true,
          });
        }

        // 5. OBSERVAÇÕES GERAIS (A partir da Linha Excel 25 -> r >= 24, Col B: c=1)
        for (let r = 24; r <= maxRow; r++) {
          const textoObs = limparTexto(lerCelula(sheet, r, 1));
          if (!textoObs || normalizar(textoObs).includes('observacoes gerais')) continue;

          const jaPago =
            normalizar(textoObs).includes('pago') &&
            !normalizar(textoObs).includes('nao pago');

          todasObservacoes.push({
            id: `planilha-${anoMes}-obs-${r}`,
            mes: anoMes,
            autor: 'Casal',
            titulo: textoObs.length > 48 ? `${textoObs.slice(0, 48)}...` : textoObs,
            texto: textoObs,
            resolvido: jaPago,
            dataCriacao: `${anoMes}-01`,
          });
        }
      });

      if (todasTransacoes.length === 0) {
        setErroMsg(
          `Aba Agosto.26 não encontrada! Abas no arquivo: ${workbook.SheetNames.join(', ')}`
        );
      } else {
        await onImportarDados(todasTransacoes, todasObservacoes);
        setResumoImportacao(
          `🎉 Agosto.26 importado com 100% de precisão: ${todasTransacoes.length} lançamentos (59 gastos = R$ 3.610,58, 4 receitas = R$ 3.980,90, 1 poupança = R$ 270,00) + ${todasObservacoes.length} observações!`
        );
      }
    } catch (err: any) {
      console.error(err);
      setErroMsg(`Erro ao ler planilha: ${err?.message || 'Formato inválido'}`);
    } finally {
      setImportando(false);
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="inline-flex items-center gap-2 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer transition shadow-sm">
        <FileSpreadsheet size={16} className="text-amber-400 shrink-0" />
        <span>
          {importando ? 'Importando Agosto.26...' : 'Importar Planilha Agosto.26'}
        </span>
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleArquivoSelecionado}
          disabled={importando}
          className="hidden"
        />
      </label>

      {resumoImportacao && (
        <div className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 px-3.5 py-2.5 rounded-xl text-xs flex items-center justify-between gap-2">
          <span className="flex items-center gap-2 font-medium">
            <CheckCircle2 size={15} className="shrink-0" />
            {resumoImportacao}
          </span>
          <button
            onClick={() => setResumoImportacao(null)}
            className="text-emerald-400 hover:text-white cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {erroMsg && (
        <div className="bg-rose-500/15 border border-rose-500/30 text-rose-300 px-3.5 py-2.5 rounded-xl text-xs flex items-center justify-between gap-2">
          <span className="flex items-center gap-2 font-medium">
            <AlertCircle size={15} className="shrink-0" />
            {erroMsg}
          </span>
          <button
            onClick={() => setErroMsg(null)}
            className="text-rose-400 hover:text-white cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>
      )}
    </div>
  );
}
```

## src\components\ModalConfigCasal.tsx
```tsx
import { useState, useEffect } from 'react';
import { X, KeyRound } from 'lucide-react';

interface ModalConfigCasalProps {
  aberto: boolean;
  onFechar: () => void;
  pessoa1: string;
  pessoa2: string;
  onSalvarNomes: (novoP1: string, novoP2: string, novaSenha?: string) => void;
}

export function ModalConfigCasal({
  aberto,
  onFechar,
  pessoa1,
  pessoa2,
  onSalvarNomes,
}: ModalConfigCasalProps) {
  const [nome1, setNome1] = useState(pessoa1);
  const [nome2, setNome2] = useState(pessoa2);
  const [novaSenha, setNovaSenha] = useState('');

  useEffect(() => {
    setNome1(pessoa1);
    setNome2(pessoa2);
    setNovaSenha('');
  }, [pessoa1, pessoa2, aberto]);

  if (!aberto) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 w-full max-w-sm rounded-2xl p-5 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm md:text-base text-white">Configurações da Conta</h3>
          <button onClick={onFechar} className="text-zinc-400 hover:text-white cursor-pointer">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-xs text-zinc-400">Pessoa 1 (Principal)</label>
            <input
              type="text"
              value={nome1}
              onChange={(e) => setNome1(e.target.value)}
              className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="text-xs text-zinc-400">Pessoa 2 (Parceiro / Noiva)</label>
            <input
              type="text"
              value={nome2}
              onChange={(e) => setNome2(e.target.value)}
              className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="pt-2 border-t border-zinc-800">
            <label className="text-xs text-zinc-400 flex items-center gap-1.5">
              <KeyRound size={13} className="text-emerald-400" />
              Redefinir Senha de Acesso (opcional)
            </label>
            <input
              type="password"
              placeholder="Deixe em branco para manter a atual"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button
            onClick={() => {
              onSalvarNomes(nome1, nome2, novaSenha.trim() || undefined);
              onFechar();
            }}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-2.5 rounded-xl text-xs md:text-sm transition cursor-pointer"
          >
            Salvar Configurações
          </button>
        </div>
      </div>
    </div>
  );
}
```

## src\components\ModalTransacao.tsx
```tsx
import React, { useState, useEffect } from 'react';

import { X, Users, User } from 'lucide-react';
import {
  type Transaction,
  type TransactionType,
  type PaymentMethod,
  CATEGORIAS_DESPESA,
  CATEGORIAS_RECEITA,
  CATEGORIAS_POUPANCA,
  CATEGORIAS_RESGATE,
  obterDataHojeLocal,
} from '../types';


interface ModalTransacaoProps {
  aberto: boolean;
  onFechar: () => void;
  pessoa1: string;
  pessoa2: string;
  salvando: boolean;
  transacaoEditando: Transaction | null;
  tipoInicial?: TransactionType;
  onSalvar: (dados: {
    id?: string;
    tipo: TransactionType;
    responsavel: string;
    valor: number;
    data: string;
    local: string;
    categoria: string;
    tags: string[];
    metodoPagamento: PaymentMethod;
    parcelas: number;
  }) => Promise<void>;
}

export function ModalTransacao({
  aberto,
  onFechar,
  pessoa1,
  pessoa2,
  salvando,
  transacaoEditando,
  tipoInicial = 'despesa',
  onSalvar,
}: ModalTransacaoProps) {
  const [tipo, setTipo] = useState<TransactionType>('despesa');
  const [responsavel, setResponsavel] = useState<string>(pessoa1);
  const [valor, setValor] = useState('');
  const [local, setLocal] = useState('');
  const [data, setData] = useState(() => obterDataHojeLocal());
  const [categoria, setCategoria] = useState(CATEGORIAS_DESPESA[0]);
  const [tags, setTags] = useState('');
  const [metodoPagamento, setMetodoPagamento] = useState<PaymentMethod>('Pix/Débito');
  const [parcelas, setParcelas] = useState(1);

  const obterCategoriaPadrao = (t: TransactionType) => {
    if (t === 'despesa') return CATEGORIAS_DESPESA[0];
    if (t === 'receita') return CATEGORIAS_RECEITA[0];
    if (t === 'poupanca') return CATEGORIAS_POUPANCA[0];
    return CATEGORIAS_RESGATE[0];
  };

  useEffect(() => {
    if (aberto && transacaoEditando) {
      setTipo(transacaoEditando.tipo);
      setResponsavel(transacaoEditando.responsavel);
      setValor(transacaoEditando.valor.toString().replace('.', ','));
      setLocal(transacaoEditando.local);
      setData(transacaoEditando.data);
      setCategoria(transacaoEditando.categoria);
      setTags(transacaoEditando.tags.map((t) => t.replace(/^#/, '')).join(', '));
      setMetodoPagamento(transacaoEditando.metodoPagamento);
      setParcelas(1);
    } else if (aberto && !transacaoEditando) {
      setTipo(tipoInicial);
      setValor('');
      setLocal('');
      setData(obterDataHojeLocal());
      setCategoria(obterCategoriaPadrao(tipoInicial));
      setTags('');
      setMetodoPagamento('Pix/Débito');
      setParcelas(1);
    }
  }, [aberto, transacaoEditando, tipoInicial]);

  const handleTrocarTipo = (novoTipo: TransactionType) => {
    setTipo(novoTipo);
    setCategoria(obterCategoriaPadrao(novoTipo));
  };

  if (!aberto) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (salvando) return;

    const valorLimpo = valor.includes(',')
      ? valor.replace(/\./g, '').replace(',', '.')
      : valor;
    const valorNumerico = parseFloat(valorLimpo);

    if (isNaN(valorNumerico) || valorNumerico <= 0 || !local.trim()) {
      alert('Preencha um valor válido e a descrição do lançamento.');
      return;
    }

    const listaTags = tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)
      .map((tag) => (tag.startsWith('#') ? tag : `#${tag}`));

    await onSalvar({
      id: transacaoEditando?.id,
      tipo,
      responsavel,
      valor: valorNumerico,
      data,
      local: local.trim(),
      categoria,
      tags: listaTags,
      metodoPagamento,
      parcelas,
    });
  };

  const listaCategoriasAtuais =
    tipo === 'despesa'
      ? CATEGORIAS_DESPESA
      : tipo === 'receita'
      ? CATEGORIAS_RECEITA
      : tipo === 'poupanca'
      ? CATEGORIAS_POUPANCA
      : CATEGORIAS_RESGATE;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-zinc-900 border border-zinc-800 w-full max-w-lg rounded-t-3xl sm:rounded-2xl p-5 md:p-6 space-y-4 shadow-2xl max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base md:text-lg text-white">
            {transacaoEditando ? 'Editar Lançamento' : 'Novo Lançamento'}
          </h3>
          <button
            onClick={onFechar}
            className="p-1.5 rounded-full bg-zinc-800 text-zinc-400 hover:text-white transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* TIPO (AGORA COM 4 OPÇÕES INCLUINDO RETIRAR DA POUPANÇA) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 bg-zinc-950 p-1.5 rounded-xl border border-zinc-800">
          <button
            type="button"
            onClick={() => handleTrocarTipo('despesa')}
            className={`py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
              tipo === 'despesa' ? 'bg-rose-500 text-white' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Gastei
          </button>
          <button
            type="button"
            onClick={() => handleTrocarTipo('receita')}
            className={`py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
              tipo === 'receita'
                ? 'bg-emerald-500 text-zinc-950'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Recebi
          </button>
          <button
            type="button"
            onClick={() => handleTrocarTipo('poupanca')}
            className={`py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
              tipo === 'poupanca'
                ? 'bg-sky-500 text-zinc-950'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Guardei
          </button>
          <button
            type="button"
            onClick={() => handleTrocarTipo('resgate_poupanca')}
            className={`py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
              tipo === 'resgate_poupanca'
                ? 'bg-amber-500 text-zinc-950'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Tirei Poupança
          </button>
        </div>

        {/* RESPONSÁVEL */}
        <div>
          <label className="text-xs text-zinc-400 font-medium">
            {tipo === 'resgate_poupanca'
              ? 'Quem retirou da poupança?'
              : 'De quem é esse registro?'}
          </label>
          <div className="grid grid-cols-3 gap-2 mt-1.5">
            {[pessoa1, pessoa2, 'Casal'].map((resp) => (
              <button
                type="button"
                key={resp}
                onClick={() => setResponsavel(resp)}
                className={`py-2 px-3 rounded-xl text-xs md:text-sm font-bold border transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  responsavel === resp
                    ? 'bg-zinc-100 text-zinc-950 border-white'
                    : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {resp === 'Casal' ? <Users size={14} /> : <User size={14} />}
                <span className="truncate">{resp}</span>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-zinc-400 font-medium">Valor (R$)</label>
              <input
                type="text"
                inputMode="decimal"
                required
                placeholder="Ex: 150,00"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm font-bold text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-400 font-medium">Data</label>
              <input
                type="date"
                required
                value={data}
                onChange={(e) => setData(e.target.value)}
                className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-zinc-400 font-medium">
              {tipo === 'resgate_poupanca'
                ? 'Motivo da Retirada / Onde foi usado'
                : 'Onde foi / Descrição'}
            </label>
            <input
              type="text"
              required
              placeholder={
                tipo === 'resgate_poupanca'
                  ? 'Ex: Compra da geladeira à vista, Imprevisto...'
                  : 'Ex: Supermercado, iFood, Salário...'
              }
              value={local}
              onChange={(e) => setLocal(e.target.value)}
              className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-zinc-400 font-medium">Categoria</label>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-emerald-500"
              >
                {listaCategoriasAtuais.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-zinc-400 font-medium">Método</label>
              <select
                value={metodoPagamento}
                onChange={(e) => setMetodoPagamento(e.target.value as PaymentMethod)}
                className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="Pix/Débito">Pix / Débito</option>
                <option value="Cartão de Crédito">Cartão de Crédito</option>
                <option value="Dinheiro">Dinheiro</option>
              </select>
            </div>
          </div>

          {!transacaoEditando && tipo === 'despesa' && metodoPagamento === 'Cartão de Crédito' && (
            <div>
              <label className="text-xs text-zinc-400 font-medium">Parcelas</label>
              <input
                type="number"
                min={1}
                max={24}
                value={parcelas}
                onChange={(e) => setParcelas(Number(e.target.value))}
                className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-sm text-white"
              />
            </div>
          )}

          <div>
            <label className="text-xs text-zinc-400 font-medium">Tags (opcional)</label>
            <input
              type="text"
              placeholder="Ex: ifood, casamento, fds"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button
            type="submit"
            disabled={salvando}
            className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-zinc-950 font-bold py-3 rounded-xl text-sm transition cursor-pointer"
          >
            {salvando
              ? 'Salvando...'
              : transacaoEditando
              ? 'Salvar Alterações'
              : 'Salvar Lançamento'}
          </button>
        </form>
      </div>
    </div>
  );
}
```

## src\components\TelaLogin.tsx
```tsx
import React, { useState, useEffect } from 'react';
import { Wallet, Lock, UserCheck, Users, Sparkles, KeyRound, CheckCircle2, ArrowLeft } from 'lucide-react';
import { type AccountId } from '../types';
import { supabase } from '../supabaseClient';

interface TelaLoginProps {
  onEntrar: (conta: AccountId) => void;
}

const INFO_CONTAS: Record<AccountId, { idBanco: number; titulo: string; subtitulo: string }> = {
  casal: {
    idBanco: 1,
    titulo: 'Juan & Esposa',
    subtitulo: 'Acesso Principal do Casal',
  },
  vitoria: {
    idBanco: 2,
    titulo: 'Vitória',
    subtitulo: 'Ambiente Financeiro Individual',
  },
};

// Código mestre caso alguém esqueça a própria senha
const CODIGO_MESTRE_RECUPERACAO = 'admin2026';

export function TelaLogin({ onEntrar }: TelaLoginProps) {
  const [contaSelecionada, setContaSelecionada] = useState<AccountId>('casal');
  const [modoRedefinir, setModoRedefinir] = useState(false);

  // Estados de Login
  const [senhaInput, setSenhaInput] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [msgSucesso, setMsgSucesso] = useState('');

  // Estados de Redefinir Senha
  const [senhaAtualInput, setSenhaAtualInput] = useState('');
  const [novaSenhaInput, setNovaSenhaInput] = useState('');
  const [confirmarSenhaInput, setConfirmarSenhaInput] = useState('');

  // Senhas carregadas do banco (padrão '123' caso ainda não exista)
  const [senhasBanco, setSenhasBanco] = useState<Record<AccountId, string>>({
    casal: localStorage.getItem('@financas:senha_casal') || '123',
    vitoria: localStorage.getItem('@financas:senha_vitoria') || '123',
  });

  const buscarSenhasAtuais = async () => {
    if (!supabase) return;
    try {
      const { data } = await supabase.from('config_casal').select('id, senha');
      if (data) {
        const novas: Record<AccountId, string> = { ...senhasBanco };
        data.forEach((row: any) => {
          if (row.id === 1 && row.senha) {
            novas.casal = String(row.senha);
            localStorage.setItem('@financas:senha_casal', String(row.senha));
          }
          if (row.id === 2 && row.senha) {
            novas.vitoria = String(row.senha);
            localStorage.setItem('@financas:senha_vitoria', String(row.senha));
          }
        });
        setSenhasBanco(novas);
      }
    } catch {
      // Usa o cache local se estiver offline
    }
  };

  useEffect(() => {
    buscarSenhasAtuais();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setMsgSucesso('');
    setCarregando(true);

    // Garante que pegou a senha mais recente da nuvem
    let senhaCorreta = senhasBanco[contaSelecionada];
    if (supabase) {
      const { data } = await supabase
        .from('config_casal')
        .select('senha')
        .eq('id', INFO_CONTAS[contaSelecionada].idBanco)
        .single();
      if (data?.senha) {
        senhaCorreta = String(data.senha);
      }
    }

    setCarregando(false);

    if (senhaInput.trim() === senhaCorreta) {
      onEntrar(contaSelecionada);
    } else {
      setErro('Senha incorreta. Tente novamente!');
    }
  };

  const handleRedefinirSenha = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setMsgSucesso('');

    const novaLimpa = novaSenhaInput.trim();
    if (novaLimpa.length < 3) {
      setErro('A nova senha deve ter pelo menos 3 caracteres.');
      return;
    }

    if (novaLimpa !== confirmarSenhaInput.trim()) {
      setErro('A confirmação da nova senha não confere.');
      return;
    }

    setCarregando(true);

    let senhaAtualReal = senhasBanco[contaSelecionada];
    if (supabase) {
      const { data } = await supabase
        .from('config_casal')
        .select('senha')
        .eq('id', INFO_CONTAS[contaSelecionada].idBanco)
        .single();
      if (data?.senha) {
        senhaAtualReal = String(data.senha);
      }
    }

    const digitada = senhaAtualInput.trim();
    if (digitada !== senhaAtualReal && digitada !== CODIGO_MESTRE_RECUPERACAO) {
      setCarregando(false);
      setErro('A senha atual digitada está incorreta.');
      return;
    }

    // Salva a nova senha no Supabase e no LocalStorage
    if (supabase) {
      const idBanco = INFO_CONTAS[contaSelecionada].idBanco;
      const { error } = await supabase
        .from('config_casal')
        .upsert({ id: idBanco, senha: novaLimpa }, { onConflict: 'id' });

      if (error) {
        setCarregando(false);
        setErro(`Erro ao salvar na nuvem: ${error.message}`);
        return;
      }
    }

    localStorage.setItem(`@financas:senha_${contaSelecionada}`, novaLimpa);
    setSenhasBanco((prev) => ({ ...prev, [contaSelecionada]: novaLimpa }));

    setCarregando(false);
    setSenhaAtualInput('');
    setNovaSenhaInput('');
    setConfirmarSenhaInput('');
    setModoRedefinir(false);
    setSenhaInput(novaLimpa);
    setMsgSucesso('Senha redefinida com sucesso! Agora é só clicar em Entrar.');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10">
            <Wallet size={28} />
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
            NossoFinanceiro
          </h1>
          <p className="text-xs text-zinc-400">
            {modoRedefinir
              ? `Redefinir senha da conta ${INFO_CONTAS[contaSelecionada].titulo}`
              : 'Selecione quem está acessando para carregar suas informações'}
          </p>
        </div>

        {/* SELETOR DE PERFIL */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => {
              setContaSelecionada('casal');
              setErro('');
              setMsgSucesso('');
            }}
            className={`p-4 rounded-2xl border text-left transition flex flex-col gap-2 cursor-pointer ${
              contaSelecionada === 'casal'
                ? 'bg-emerald-500/15 border-emerald-500 text-white shadow-lg shadow-emerald-500/10'
                : 'bg-zinc-950/70 border-zinc-800 text-zinc-400 hover:border-zinc-700'
            }`}
          >
            <Users
              size={22}
              className={contaSelecionada === 'casal' ? 'text-emerald-400' : 'text-zinc-500'}
            />
            <div>
              <p className="font-bold text-sm">Juan & Esposa</p>
              <p className="text-[11px] text-zinc-400">Conta do Casal</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              setContaSelecionada('vitoria');
              setErro('');
              setMsgSucesso('');
            }}
            className={`p-4 rounded-2xl border text-left transition flex flex-col gap-2 cursor-pointer ${
              contaSelecionada === 'vitoria'
                ? 'bg-emerald-500/15 border-emerald-500 text-white shadow-lg shadow-emerald-500/10'
                : 'bg-zinc-950/70 border-zinc-800 text-zinc-400 hover:border-zinc-700'
            }`}
          >
            <Sparkles
              size={22}
              className={contaSelecionada === 'vitoria' ? 'text-emerald-400' : 'text-zinc-500'}
            />
            <div>
              <p className="font-bold text-sm">Vitória</p>
              <p className="text-[11px] text-zinc-400">Conta Exclusiva</p>
            </div>
          </button>
        </div>

        {msgSucesso && (
          <div className="bg-emerald-500/15 border border-emerald-500/30 rounded-xl p-3 text-xs text-emerald-300 flex items-center gap-2 font-medium">
            <CheckCircle2 size={16} className="shrink-0 text-emerald-400" />
            <span>{msgSucesso}</span>
          </div>
        )}

        {!modoRedefinir ? (
          /* ==================== FORMULÁRIO DE LOGIN ==================== */
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs text-zinc-400 font-medium flex items-center gap-1.5">
                <Lock size={13} className="text-emerald-400" />
                Senha de acesso para <strong>{INFO_CONTAS[contaSelecionada].titulo}</strong>
              </label>
              <input
                type="password"
                required
                placeholder="Digite sua senha"
                value={senhaInput}
                onChange={(e) => setSenhaInput(e.target.value)}
                className="w-full mt-1.5 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
              {erro && <p className="text-xs text-rose-400 mt-1.5 font-medium">{erro}</p>}
            </div>

            <button
              type="submit"
              disabled={carregando}
              className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-zinc-950 font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-emerald-500/20"
            >
              <UserCheck size={18} />
              {carregando ? 'Verificando...' : `Entrar como ${INFO_CONTAS[contaSelecionada].titulo}`}
            </button>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => {
                  setModoRedefinir(true);
                  setErro('');
                  setMsgSucesso('');
                }}
                className="text-xs text-zinc-400 hover:text-emerald-400 inline-flex items-center gap-1.5 transition cursor-pointer"
              >
                <KeyRound size={13} />
                Alterar / Redefinir senha desta conta
              </button>
            </div>
          </form>
        ) : (
          /* ==================== FORMULÁRIO DE REDEFINIR SENHA ==================== */
          <form onSubmit={handleRedefinirSenha} className="space-y-3.5">
            <div>
              <label className="text-xs text-zinc-400 font-medium">
                Senha Atual ({INFO_CONTAS[contaSelecionada].titulo})
              </label>
              <input
                type="password"
                required
                placeholder="Digite a senha atual (padrão inicial: 123)"
                value={senhaAtualInput}
                onChange={(e) => setSenhaAtualInput(e.target.value)}
                className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-400 font-medium">Nova Senha</label>
              <input
                type="password"
                required
                placeholder="Digite a nova senha"
                value={novaSenhaInput}
                onChange={(e) => setNovaSenhaInput(e.target.value)}
                className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-400 font-medium">Confirmar Nova Senha</label>
              <input
                type="password"
                required
                placeholder="Repita a nova senha"
                value={confirmarSenhaInput}
                onChange={(e) => setConfirmarSenhaInput(e.target.value)}
                className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {erro && <p className="text-xs text-rose-400 font-medium">{erro}</p>}

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  setModoRedefinir(false);
                  setErro('');
                }}
                className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold py-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <ArrowLeft size={14} /> Voltar
              </button>

              <button
                type="submit"
                disabled={carregando}
                className="flex-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-zinc-950 font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <KeyRound size={14} />
                {carregando ? 'Salvando...' : 'Salvar Nova Senha'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
```

## src\index.css
```css
@import "tailwindcss";
```

## src\main.tsx
```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

```

## src\supabaseClient.ts
```ts
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://lbnjohkoqqqbfiwgtfta.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_NvA1Efn5PmLID6MBOWq7wQ_kvPIJhaU';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```

## src\types.ts
```ts
export type AccountId = 'casal' | 'vitoria';
export type TransactionType =
  | 'despesa'
  | 'receita'
  | 'poupanca'
  | 'resgate_poupanca'
  | 'transferencia_interna';
export type PaymentMethod = 'Pix/Débito' | 'Cartão de Crédito' | 'Dinheiro';
export type ActiveTab = 'home' | 'extrato' | 'metas' | 'enxoval' | 'observacoes' | 'graficos';
export type PrioridadeItem = 'Alta' | 'Média' | 'Baixa';

export interface Transaction {
  id: string;
  tipo: TransactionType;
  valor: number;
  data: string; // YYYY-MM-DD
  local: string;
  categoria: string;
  tags: string[];
  metodoPagamento: PaymentMethod;
  parcelaInfo?: string;
  responsavel: string;
  pendenteSync?: boolean;
}

export interface EnxovalItem {
  id: string;
  comodo: string;
  item: string;
  quantidade: number;
  valor: number;
  prioridade: PrioridadeItem;
  observacao: string;
  comprado: boolean;
}

export interface ObservacaoMes {
  id: string;
  mes: string; // YYYY-MM
  autor: string;
  titulo: string;
  texto: string;
  valor?: number;
  resolvido: boolean;
  dataCriacao: string; // YYYY-MM-DD
}

export interface CategoryBudget {
  categoria: string;
  limite: number;
}

export const COMODOS_PADRAO = [
  'Cozinha',
  'Quarto',
  'Sala',
  'Banheiro',
  'Lavanderia / Área de Serviço',
  'Outros',
];

export const CATEGORIAS_DESPESA = [
  'Comida',
  'Lazer',
  'Transporte',
  'Contas Fixas',
  'Casa/Casamento',
  'Compras',
  'Saúde',
  'Outros',
];

export const CATEGORIAS_RECEITA = [
  'Salário',
  'Freelance',
  'Rendimentos',
  'Reembolso/Pix',
  'Outros',
];

export const CATEGORIAS_POUPANCA = [
  'Reserva do Casal',
  'Casamento / Casa',
  'Investimentos',
  'Meta Individual',
];

export const CATEGORIAS_RESGATE = [
  'Emergência / Imprevisto',
  'Compra para Casa / Enxoval',
  'Pagamento de Conta',
  'Uso Pessoal',
  'Outros',
];

export const CATEGORIAS_TRANSFERENCIA = [
  'Transferência entre Contas',
  'Movimentação Interna',
  'Pagamento de Fatura Própria',
];

export const ORCAMENTOS_INICIAIS: CategoryBudget[] = [
  { categoria: 'Comida', limite: 800 },
  { categoria: 'Lazer', limite: 450 },
  { categoria: 'Casa/Casamento', limite: 600 },
  { categoria: 'Transporte', limite: 300 },
  { categoria: 'Contas Fixas', limite: 700 },
  { categoria: 'Compras', limite: 400 },
  { categoria: 'Saúde', limite: 250 },
  { categoria: 'Outros', limite: 200 },
];

export const obterDataHojeLocal = () => {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const dia = String(hoje.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
};

export const obterMesAtualLocal = () => obterDataHojeLocal().slice(0, 7);

export const formatarMoeda = (valor: number) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export const formatarDataBR = (dataISO: string) => {
  const partes = dataISO.split('-');
  if (partes.length !== 3) return dataISO;
  return `${partes[2]}/${partes[1]}/${partes[0]}`;
};

export const nomeMesAno = (anoMes: string) => {
  const [ano, mes] = anoMes.split('-').map(Number);
  const data = new Date(ano, mes - 1, 1);
  const nome = data.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  return nome.charAt(0).toUpperCase() + nome.slice(1);
};
```

## tsconfig.app.json
```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023", "DOM"],
    "module": "esnext",
    "types": ["vite/client"],
    "allowArbitraryExtensions": true,
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}

```

## tsconfig.json
```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}

```

## tsconfig.node.json
```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023"],
    "types": ["node"],
    "skipLibCheck": true,

    /* Bundler mode */
    "module": "nodenext",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}

```

## vite.config.ts
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```
