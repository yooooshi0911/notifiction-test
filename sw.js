self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

// 通知がクリックされた時の処理
self.addEventListener('notificationclick', (event) => {
    event.notification.close(); // 通知を閉じる

    event.waitUntil(
        clients.matchAll({ type: 'window' }).then((clientList) => {
            // すでにアプリが開いていればフォーカスする
            for (const client of clientList) {
                if (client.url.includes('/') && 'focus' in client) {
                    return client.focus();
                }
            }
            // 開いていなければ新しいウィンドウで開く
            if (clients.openWindow) {
                return clients.openWindow('/');
            }
        })
    );
});
