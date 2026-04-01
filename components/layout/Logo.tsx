'use client';

import Link from 'next/link';

import React from 'react';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 no-underline">
      <div className="flex flex-col items-start">
        {/* Logo Icon */}
        <div className="flex items-center gap-2">
          <svg
            width="40"
            height="40"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Stylized person/graduate figure */}
            <circle cx="50" cy="25" r="12" fill="#0d9488" />
            <path
              d="M35 45 Q50 35 65 45 L65 55 Q50 45 35 55 Z"
              fill="#0d9488"
            />
            {/* Arms raised in success */}
            <path
              d="M35 45 L20 25 L25 20 L38 38"
              fill="#0d9488"
            />
            <path
              d="M65 45 L80 25 L75 20 L62 38"
              fill="#0d9488"
            />
            {/* Body */}
            <path
              d="M38 50 L38 85 L45 85 L45 60 L55 60 L55 85 L62 85 L62 50 Q50 45 38 50"
              fill="#0d9488"
            />
            {/* Graduation cap */}
            <path
              d="M30 18 L50 8 L70 18 L50 28 Z"
              fill="#0d9488"
            />
            <path
              d="M70 18 L70 25 L65 22"
              fill="#0d9488"
            />
          </svg>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-gray-800 leading-tight">
              Malisha<span className="text-[#0d9488]">Edu</span>
            </span>
            <span className="text-xs text-gray-600">马丽莎教育</span>
          </div>
        </div>
        <span className="text-[10px] text-gray-500 mt-0.5">The China Education Expert</span>
      </div>
    </Link>
  );
}

