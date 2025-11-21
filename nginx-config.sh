#!/bin/bash
set -e

# 🚨 반드시 실제 GitLab 레포지토리가 서버에 클론된 경로로 수정하세요!
# (정적 파일 호스팅 경로를 위해 사용됨)
JJI_REPO_PATH="/home/ubuntu/dev/jji" # 예시 경로로 변경했습니다. 실제 경로로 수정하세요.

echo "⚙️  Nginx 설정 업데이트 중... (ne.jji.kr 프록시 복구)"

# Nginx 설정 파일 생성 (jji-monorepo)
sudo tee /etc/nginx/sites-available/jji-monorepo > /dev/null <<EOF
map \$http_upgrade \$connection_upgrade {
    default upgrade;
    ''      close;
}

# 1. 메인 앱 (jji.kr) - Next.js 앱
upstream next_app {
    server 127.0.0.1:3000; # jji-app 포트
    keepalive 64;
}

# 2. NE.JJI.KR (프로젝트 2) - Next.js 앱 (3002 포트)
upstream ne_app {
    server 127.0.0.1:3002; # ne-app 포트
    keepalive 64;
}

# 3. CAREER.JJI.KR (경력 페이지) - Next.js 앱 (3003 포트)
upstream career_app {
    server 127.0.0.1:3003; # career-app 포트
    keepalive 64;
}

server {
    listen 80;
    listen [::]:80;
    server_name jji.kr www.jji.kr;

    location / {
        proxy_pass http://next_app;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection \$connection_upgrade;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_read_timeout 60s;
        proxy_send_timeout 60s;
    }
}

# ⭐️⭐️⭐️ NE.JJI.KR 복구: 정적 호스팅 대신 3002 포트 프록시 사용 ⭐️⭐️⭐️
server {
    listen 80;
    listen [::]:80;
    server_name ne.jji.kr;
    
    location / {
        proxy_pass http://ne_app;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection \$connection_upgrade;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_read_timeout 60s;
        proxy_send_timeout 60s;

        # 🚨 중요: 클라이언트 캐싱 비활성화 추가 (이전 문제 방지)
        add_header Cache-Control "no-store, no-cache, must-revalidate, proxy-revalidate";
        expires off;
    }

    # Next.js의 정적 에셋 (JS, CSS, 이미지 등) 캐싱 제어
    location ~ ^/_next/static/ {
        proxy_pass http://ne_app;
        add_header Cache-Control "public, max-age=31536000, immutable";
        expires 1y;
    }
}

# MO.JJI.KR - 정적 웹사이트 (Next.js 빌드가 정적 output: 'export'일 경우)
server {
    listen 80;
    listen [::]:80;
    server_name mo.jji.kr;
    
    # 🚨 mo 폴더의 out/ 디렉토리 또는 루트 디렉토리를 지정해야 합니다.
    root ${JJI_REPO_PATH}/mo/out; 
    index index.html;

    location / {
        try_files \$uri \$uri/ =404;
    }
}

# CAREER.JJI.KR - Next.js 앱 (3003 포트 사용)
server {
    listen 80;
    listen [::]:80;
    server_name career.jji.kr;
    
    location / {
        proxy_pass http://career_app;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection \$connection_upgrade;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_read_timeout 60s;
        proxy_send_timeout 60s;
    }
}

# ⭐️ CV.JJI.KR - 정적 웹사이트 (정적 호스팅으로 가정)
server {
    listen 80;
    listen [::]:80;
    server_name cv.jji.kr;
    
    root ${JJI_REPO_PATH}/cv;
    index index.html;

    location / {
        try_files \$uri \$uri/ =404;
    }
}

# 기본 서버 (IP/기타 호스트로 접근 시 처리)
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

    location / {
        proxy_pass http://next_app; # 기본 서버도 메인 앱으로 연결 유지
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection \$connection_upgrade;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_read_timeout 60s;
        proxy_send_timeout 60s;
    }
}
EOF

# 이전 링크 제거 및 새 링크 생성 (이름 변경)
# 주의: 이전에 nextjs-app이었으므로 그 링크를 제거합니다.
sudo rm -f /etc/nginx/sites-enabled/nextjs-app
sudo rm -f /etc/nginx/sites-enabled/jji-monorepo # 이전 링크 삭제
sudo ln -sf /etc/nginx/sites-available/jji-monorepo /etc/nginx/sites-enabled/

# Nginx 설정 테스트 및 재시작
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx

echo "✅ Nginx 모노레포 설정 완료! ne.jji.kr 프록시가 3002번 포트로 복구되었습니다."
