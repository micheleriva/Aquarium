<img src="/docs/imgs/banner.png" width="100%" align="center" />

<div align="center">
  <a href="https://travis-ci.org/micheleriva/Aquarium">
    <img src="https://img.shields.io/travis/micheleriva/Aquarium.svg?style=for-the-badge" alt="Build Status" />
  </a>
  <a href="https://codecov.io/gh/micheleriva/Aquarium">
    <img src="https://img.shields.io/codecov/c/github/micheleriva/Aquarium.svg?style=for-the-badge" alt="Coverage" />
  </a>
  <a href="/LICENSE.md">
    <img src="https://img.shields.io/badge/License-The%20Unlicense-blue.svg?style=for-the-badge" alt="License">
  </a>
</div>

<br />

<p>
  <b>Aquarium</b> is a functional, simple and academic blockchain implementation. Not ready in any way to be used in production. <br /> 
  Aquarium has been made for research purposes.
</p>

# Concept
Aquarius is a functional blockchain implementation. <br />
Works in Node.js (and possibly on the browser) and takes advantage of multicore computation in order to mine new coins and give proof of work. <br />
It's extremely easy to parallelize and to distribute due to its functional and immutable structure. <br />
Performance is not a goal for this project: recursion always uses **tail call elimination** in order to handle memory in a safe way.

**P2P** connection will be granted using websockets, so it will be easy to distribute the Aquarium blockchain to different clients. <br />
A **REST** interface will also be granted thanks to Koa. 

Still a big work in progress!

# License
[The Unlicense](/LICENSE.md)

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or distribute this software, either in source code form or as a compiled binary, for any purpose, commercial or non-commercial, and by any means.

In jurisdictions that recognize copyright laws, the author or authors of this software dedicate any and all copyright interest in the software to the public domain. We make this dedication for the benefit of the public at large and to the detriment of our heirs and successors. We intend this dedication to be an overt act of relinquishment in perpetuity of all present and future rights to this software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to http://unlicense.org