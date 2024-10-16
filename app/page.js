// app/page.js

"use client";
import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [copyTooltip, setCopyTooltip] = useState('Copy');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/permission-code/${encodeURIComponent(inputText)}`
      );

      if (response.ok) {
        const data = await response.json();
        setGeneratedCode(data.code);
      } else {
        console.error('Error generating code:', response.status);
      }
    } catch (error) {
      console.error('Error generating code:', error);
    }
    setIsLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopyTooltip('Copied!');
    setTimeout(() => setCopyTooltip('Copy'), 1500);
  };

  return (
    <div className="container">
      <Head>
        <title>F-tree: Permission</title>
      </Head>

      <main className="main">
        <h1 className="title">F-tree: Permission</h1>

        <div className="input-container">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text"
            className="input"
          />
          <button onClick={handleGenerate} className="generate-btn" disabled={isLoading}>
            {isLoading ? (
              <div className="spinner"></div>
            ) : (
              'Generate Code'
            )}
          </button>
        </div>

        {generatedCode && (
          <div className="output-container">
            <span className="code">{generatedCode}</span>
            <button className="copy-btn" onClick={handleCopy} onMouseOver={() => setCopyTooltip('Copy')}>
              📄
              <span className="tooltip">{copyTooltip}</span>
            </button>
          </div>
        )}
      </main>

      <style jsx>{`
        /* 스타일 업데이트 */
        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
        }
        .main {
          text-align: center;
          padding: 40px;
          border-radius: 15px;
          background-color: rgba(255, 255, 255, 0.85);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
          backdrop-filter: blur(10px);
        }
        .title {
          font-size: 2.5rem;
          margin-bottom: 30px;
          color: #333;
          font-weight: bold;
          letter-spacing: 1px;
        }
        .input-container {
          display: flex;
          justify-content: center;
          margin-bottom: 30px;
        }
        .input {
          padding: 15px;
          font-size: 1rem;
          border: 2px solid #ccc;
          border-radius: 10px;
          margin-right: 15px;
          width: 300px;
          transition: border-color 0.3s;
        }
        .input:focus {
          outline: none;
          border-color: #0070f3;
        }
        .generate-btn {
          padding: 15px 25px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: background-color 0.3s, transform 0.3s;
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .generate-btn:disabled {
          background-color: #aaa;
          cursor: not-allowed;
        }
        .generate-btn:hover:not(:disabled) {
          background-color: #005bb5;
          transform: translateY(-2px);
        }
        .spinner {
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-top: 4px solid white;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        .output-container {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #fafafa;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        .code {
          font-size: 1.5rem;
          margin-right: 15px;
          color: #333;
          font-family: 'Courier New', Courier, monospace;
          word-break: break-all;
        }
        .copy-btn {
          position: relative;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.5rem;
        }
        .tooltip {
          visibility: hidden;
          position: absolute;
          top: -35px;
          left: 50%;
          transform: translateX(-50%);
          background-color: black;
          color: white;
          padding: 7px;
          border-radius: 5px;
          font-size: 0.75rem;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .copy-btn:hover .tooltip {
          visibility: visible;
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
