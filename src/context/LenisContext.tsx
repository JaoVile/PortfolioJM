"use client";

import React, { createContext } from 'react';
import Lenis from 'lenis';

export const LenisContext = createContext<Lenis | null>(null);
