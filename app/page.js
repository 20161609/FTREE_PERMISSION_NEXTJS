// app/page.js

"use client";
import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [copyTooltip, setCopyTooltip] = useState('Copy');

  const handleGenerate = async () => {
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
          <button onClick={handleGenerate} className="generate-btn">
            code
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
        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: #f5f5f5;
        }
        .main {
          text-align: center;
          padding: 20px;
          border-radius: 10px;
          background-color: white;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        .title {
          font-size: 2rem;
          margin-bottom: 20px;
          color: #333;
        }
        .input-container {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }
        .input {
          padding: 10px;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 5px;
          margin-right: 10px;
          width: 250px;
        }
        .generate-btn {
          padding: 10px 20px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .generate-btn:hover {
          background-color: #005bb5;
        }
        .output-container {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .code {
          font-size: 1.5rem;
          margin-right: 10px;
          color: #333;
          font-family: 'Courier New', Courier, monospace;
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
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          background-color: black;
          color: white;
          padding: 5px;
          border-radius: 5px;
          font-size: 0.75rem;
        }
        .copy-btn:hover .tooltip {
          visibility: visible;
        }
      `}</style>
    </div>
  );
}
