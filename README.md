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
Works in Node.js and [Graal VM](https://www.graalvm.org/) and takes advantage of multicore computation in order to mine new coins and give proof of work. <br />
It's extremely easy to parallelize and to distribute due to its functional and immutable structure. <br />
Performance is not a goal for this project: recursion always uses **tail call elimination** in order to handle memory in a safe way.

Still a big work in progress!

# License
[The Unlicense](/LICENSE.md)