import { useAppDispatch } from '@renderer/store/hooks';
import { useRouter } from '@tanstack/react-router';
import { LogOut } from 'lucide-react';
import { resetAuth } from '@renderer/store/slices/auth.slice';
import { Button } from './button';

const LogoutButton = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(resetAuth());
    router.navigate({ to: '/' });
  };

  return (
    <Button
      variant="destructive"
      size="default"
      onClick={handleLogout}
      className="gap-2"
    >
      <LogOut className="w-4 h-4" />
      Logout
    </Button>
  );
};

export default LogoutButton;
