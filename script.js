// AWS 設定 (認証情報は安全な方法で管理してください)
AWS.config.region = 'ap-northeast-1'; // 例: 'us-east-1'
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
		IdentityPoolId: 'ap-northeast-1:1fcd61e3-a0df-4224-ab59-33523ae27e98', // Cognito Identity Pool ID
});

const lexruntime = new AWS.LexRuntime();
const botName = "csbot"; // Lex ボットの名前
const botAlias = "ChatAlias"; // または特定のエイリアス
const userId = "user-" + Date.now(); // 一意のユーザーID

const chatOutput = document.getElementById('chat-output');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// 送信ボタンのクリックイベント
sendButton.addEventListener('click', sendMessage);

// Enter キーでの送信
userInput.addEventListener('keydown', (event) => {
		if (event.key === 'Enter') {
			// sendMessage();
		}
});

function sendMessage() {
	const inputText = userInput.value.trim();
	if (!inputText) return; // 空文字の場合は送信しない
	
	displayMessage(inputText, 'user'); // ユーザーのメッセージを表示
	userInput.value = ''; // 入力欄をクリア
	
	const params = {
		botName: botName,
		botAlias: botAlias,
		userId: userId,
		inputText: inputText,
	};
	
	lexruntime.postText(params, (err, data) => {
			if (err) {
				console.error(err);
            			displayMessage(`エラーが発生しました: ${err.message || '不明なエラー'}`, 'bot');
			} else {
				displayMessage(data.message, 'bot');
				if (data.dialogState === 'ReadyForFulfillment') {
					// フルフィルメント処理 (必要に応じて)
				}
			}
	});
}

function displayMessage(message, sender) {
	const messageDiv = document.createElement('div');
	messageDiv.textContent = `${sender === 'user' ? 'あなた' : 'ボット'}: ${message}`;
	messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
	chatOutput.appendChild(messageDiv);
	
	// スクロールを最新のメッセージに合わせる
	chatOutput.scrollTop = chatOutput.scrollHeight;
}
