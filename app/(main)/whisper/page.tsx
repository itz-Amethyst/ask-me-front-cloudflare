"use client";


import Image from 'next/image'
import axios from "axios";
import { useState, useEffect } from "react";
import { Loader } from "@/components/loader";
import { BASE_URL } from "@/lib/route"

const WhisperPage = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);
	const [showMessage, setShowMessage] = useState(false);
	const [file, setFile] = useState(null);


	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			handleSubmit();
		}
	};

	const handleFile = (e) => {
		const selectedFile = e.target.files[0];
		setFile(selectedFile);
	};

	const handleSubmit = () => {
		if (!file) {
			console.log('Please select a file');
			return;
		}

		setIsLoading(true);

		const formData = new FormData();
		formData.append('file', file);


		axios.post(`${BASE_URL}/api/whisper`, formData)
			.then(response => {
				setIsLoading(false);
				console.log(response);

				const botMessage = { content: response.data.extracted_text, word_count: response.data.word_count, sender: 'bot' };
				setMessages([...messages, botMessage]);
			})
			.catch(error => {
				console.error('Error:', error);
				setIsLoading(false);
				setShowMessage(false);
			});

		setShowMessage(true);
		setFile(null);
	};

	useEffect(() => {
		console.log(message); // Log message after it has been updated
	  }, [message]); // Run this effect whenever message changes



	return (
		<>
			{isLoading && (
				<div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
					<Loader />
				</div>
			)}
			<div className="flex flex-col flex-grow overflow-auto">
				<div className="flex px-4 py-3">
					<div className="h-10 w-10 rounded flex-shrink-0 bg-gray-300">
						<div className="w-10 h-10 relative">
							<Image src="/bot.png" alt="Sam" className="h-6 w-6 rounded-full" fill />
						</div>
					</div>
					<div className="ml-2">
						<div className="-mt-1 flex items-center">
							<span className="text-sm font-semibold">BOT</span>

						</div>
						<p className="text-sm">Upload an audio file , and I will help you identify its contents</p>
						<div className="flex space-x-2 mt-1">
							<button className="flex items-center pl-1 pr-2 h-5 bg-gray-300 hover:bg-gray-400 rounded-full text-xs">
								<span>🔥</span>
								<span className="ml-1 font-medium">2</span>
							</button>
						</div>
					</div>
				</div>


				<div className="flex flex-col items-center mt-2">

				</div>


				{showMessage && messages.map((msg, index) => (
					<div key={index} className="flex px-4 py-3">
						<div className="w-10 h-10 relative">
							<Image src="/user.png" alt="user" className="h-6 w-6 rounded-full" fill />
						</div>
						<div className="ml-2">
							<div className="-mt-1">
								<span className="text-sm font-semibold">Bot</span>
							</div>
							<p className="text-sm">{msg.content}</p>
							<p className="text-sm">Word Count: {msg.word_count}</p>

						</div>
					</div>
				))}

			</div>


			<div className="h-12 bg-white px-5 pb-4 text-x">
				<div className="flex items-center border-2 border-gray-300 rounded-sm p-1">
					<input disabled={isLoading} onKeyDown={handleKeyDown} onChange={handleFile} className="flex-grow text-sm px-3 border-l border-gray-300 ml-1" style={{ resize: 'none' }} type='file' accept='.wav, .mp3, .ogg'></input>


					<button disabled={isLoading} className="flex-shrink flex items-center justify-center h-6 w-6 rounded hover:bg-gray-200" onClick={handleSubmit}>
						<svg className="h-4 w-4 transform rotate-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
							<path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
						</svg>
					</button>
				</div>
			</div>
		</>
	);
};

export default WhisperPage;
