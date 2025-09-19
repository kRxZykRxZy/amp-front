<script lang="ts">
  import { isLoggedIn } from '$stores/session';
  import { Check, X } from '@lucide/svelte'; // Re-import Check and X for password validation icons

  // Form input variables
  let username: string = ''; // Keep username for validation against password
  let password: string = '';
  let confirmPassword: string = '';
  let email: string = '';

  // Custom Message Box state
  let showModal: boolean = false;
  let modalMessage: string = '';

  /**
   * Displays a custom modal message instead of a native alert.
   * @param message The message to display in the modal.
   */
  function showMessageBox(message: string): void {
    modalMessage = message;
    showModal = true;
  }

  /**
   * Closes the custom modal message.
   */
  function closeMessageBox(): void {
    showModal = false;
    modalMessage = '';
  }

  // List of common passwords for validation
  const commonPasswords: string[] = [
    '123456',
    'password',
    'secret',
    'dragon',
    'ampmod',
    'ultiblocks',
    'letmein',
    'qwerty',
    'abc123',
    'monkey',
    'iloveyou',
    '123456789',
    '12345678',
    'incorrect'
  ];

  // --- Password Validation Functions (re-added) ---
  /**
   * Validates password length.
   * @param pw The password string.
   * @returns True if length is at least 6 characters.
   */
  function isPasswordValidLength(pw: string): boolean {
    return pw.length >= 6;
  }

  /**
   * Checks if password is not common.
   * @param pw The password string.
   * @returns True if password is not in the common passwords list.
   */
  function isPasswordNotCommon(pw: string): boolean {
    return !commonPasswords.includes(pw.toLowerCase()); // Convert to lowercase for common password check
  }

  /**
   * Checks if password contains username (case-insensitive).
   * @param pw The password string.
   * @param uname The username string.
   * @returns True if password does NOT contain username.
   */
  function doesPasswordNotContainUsername(pw: string, uname: string): boolean {
    return !pw.toLowerCase().includes(uname.toLowerCase()) || uname === ''; // If username is empty, this check passes
  }

  // --- Username Validation Functions (kept for password check reference) ---
  function isUsernameValidLength(name: string): boolean {
    return name.length >= 3 && name.length <= 20;
  }

  function doesUsernameContainValidChars(name: string): boolean {
    return /^[a-zA-Z0-9_-]+$/.test(name) || name == '';
  }

  function isUsernameNotTaken(name: string): boolean {
    return name.toLowerCase() !== 'ampelectrecuted'; // Replace with actual check
  }

  function isUsernameAppropriate(name: string): boolean {
    return !name.toLowerCase().includes('badusername'); // Replace with actual check
  }
  // --- End Username Validation Functions ---


  /**
   * Handles the join logic for AmpMod accounts.
   * Performs all necessary validations before proceeding.
   */
  function handleJoin(): void {
    // Basic validation for username (assuming it's pre-filled/derived from Scratch)
    // If username is truly pre-filled and not editable, some of these checks might be redundant
    // but are kept for robustness if the field were to become editable.
    const isUsernameOkay =
      isUsernameValidLength(username) &&
      doesUsernameContainValidChars(username) &&
      isUsernameNotTaken(username) &&
      isUsernameAppropriate(username);

    if (!isUsernameOkay) {
      showMessageBox('There was an issue with the username. Please ensure it meets all requirements.');
      return;
    }

    // Password validation
    const isPasswordOkay =
      isPasswordValidLength(password) &&
      isPasswordNotCommon(password) &&
      doesPasswordNotContainUsername(password, username); // Check password against username

    if (!isPasswordOkay) {
      showMessageBox('Password does not meet the requirements.');
      return;
    }

    if (password !== confirmPassword) {
      showMessageBox('Passwords do not match!');
      return;
    }

    // If all validations pass, proceed with registration logic
    console.log({ username, password, email });
    showMessageBox('Account created successfully! Welcome to AmpMod.');
    // In a real app, you would send this data to your backend for account creation
    // and then redirect the user or log them in.
  }
</script>

<svelte:head>
  <title>Join AmpMod</title>
</svelte:head>

<!-- Main container for the join form -->
<div
  class="max-w-xl mx-auto mt-16 p-8 border rounded-lg font-sans shadow-lg
         border-gray-300 dark:border-border-dark
         bg-background dark:bg-background-dark
         text-text dark:text-text-dark"
>
  <!-- Conditional message if user is already logged in -->
  {#if $isLoggedIn}
    <p class="text-center text-accent dark:text-accent-secondary text-lg font-medium">
      You already seem to be logged into AmpMod.
    </p>
  {:else}
    <h1 class="text-center text-2xl font-bold mb-6">Join AmpMod</h1>
    <form on:submit|preventDefault={handleJoin} class="flex flex-col gap-6">
      <p class="text-center mb-4 text-gray-700 dark:text-gray-300 text-base">
        Your username will be automatically set based on your Scratch account.
        You now need to set a password for your AmpMod account.
        <strong>Do not use your Scratch password here.</strong>
        <br />
        Your Scratch username will be reused. If you want to change it, you can
        do so in settings after joining.
    </p>
      <!-- Password input field -->
      <div class="flex flex-col gap-2">
        <label for="password" class="font-medium">Password</label>
        <input
          id="password"
          type="password"
          bind:value={password}
          required
          class="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-accent
                 border-gray-300 dark:border-border-dark
                 bg-white dark:bg-gray-800
                 text-text dark:text-text-dark"
          autocomplete="new-password"
        />
      </div>

      <!-- Confirm Password input field -->
      <div class="flex flex-col gap-2">
        <label for="confirmPassword" class="font-medium">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          bind:value={confirmPassword}
          required
          class="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-accent
                 border-gray-300 dark:border-border-dark
                 bg-white dark:bg-gray-800
                 text-text dark:text-text-dark"
          autocomplete="new-password"
        />
        {#if password !== confirmPassword && confirmPassword !== ''}
          <p class="text-red-600 dark:text-red-400 mt-1 text-sm">
            ❌ Passwords do not match!
          </p>
        {/if}
      </div>

      <!-- Password Requirements -->
      <p class="mt-1 text-gray-700 dark:text-gray-300">Password must:</p>
      <ul class="mt-1 pl-4 text-gray-500 dark:text-gray-400 text-sm list-none">
        <li
          class="flex items-center gap-2"
          class:valid={isPasswordValidLength(password)}
        >
          {#if isPasswordValidLength(password)}<Check color="#22c55e" size={18} />{:else}<X
            color="#ef4444"
            size={18}
          />{/if} Be at least 6 characters long
        </li>
        <li
          class="flex items-center gap-2"
          class:valid={isPasswordNotCommon(password)}
        >
          {#if isPasswordNotCommon(password)}<Check color="#22c55e" size={18} />{:else}<X
            color="#ef4444"
            size={18}
          />{/if} Not be a common password
        </li>
        <li
          class="flex items-center gap-2"
          class:valid={doesPasswordNotContainUsername(password, username)}
        >
          {#if doesPasswordNotContainUsername(password, username)}<Check
              color="#22c55e"
              size={18}
            />{:else}<X color="#ef4444" size={18} />{/if} Not contain your
          username
        </li>
      </ul>

      <!-- Email input field -->
      <div class="flex flex-col gap-2 mt-4">
        <label for="email" class="font-medium">Email (optional)</label>
        <input
          id="email"
          type="email"
          bind:value={email}
          class="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-accent
                 border-gray-300 dark:border-border-dark
                 bg-white dark:bg-gray-800
                 text-text dark:text-text-dark"
          autocomplete="email"
        />
      </div>

      <!-- Join button -->
      <button
        type="submit"
        class="py-2 px-4 rounded-lg bg-accent text-white font-bold hover:bg-green-600 transition mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!(isPasswordValidLength(password) && isPasswordNotCommon(password) && doesPasswordNotContainUsername(password, username) && password === confirmPassword && confirmPassword !== '')}
      >
        Join AmpMod
      </button>
    </form>
  {/if}
</div>

<!-- Custom Message Box Modal -->
{#if showModal}
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div
      class="bg-white dark:bg-background-dark p-6 rounded-lg shadow-xl max-w-sm w-full text-center
             border border-gray-300 dark:border-border-dark
             text-text dark:text-text-dark"
    >
      <p class="mb-4 text-lg font-semibold">{modalMessage}</p>
      <button
        class="py-2 px-4 rounded-lg bg-accent text-white font-bold hover:bg-green-600 transition"
        on:click={closeMessageBox}
      >
        OK
      </button>
    </div>
  </div>
{/if}
