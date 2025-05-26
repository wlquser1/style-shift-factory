
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Download, RefreshCw, Palette, Sparkles, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const GeneratePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [progress, setProgress] = useState(0);
  const [isGenerating, setIsGenerating] = useState(true);
  const [generatedImage, setGeneratedImage] = useState<string>('');
  const [originalImage, setOriginalImage] = useState<string>('');
  const [cuteness, setCuteness] = useState([75]);
  const [saturation, setSaturation] = useState([80]);
  
  // Get file and style from navigation state
  const { file, style } = location.state || {};

  useEffect(() => {
    if (!file || !style) {
      navigate('/');
      return;
    }

    // Convert file to URL for preview
    const imageUrl = URL.createObjectURL(file);
    setOriginalImage(imageUrl);

    // Simulate AI generation process
    const simulateGeneration = () => {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsGenerating(false);
            // Use placeholder for generated image
            setGeneratedImage('https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face');
            toast({
              title: "生成完成！",
              description: "您的二次元头像已成功生成",
            });
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 200);

      return () => clearInterval(interval);
    };

    const cleanup = simulateGeneration();
    return cleanup;
  }, [file, style, navigate, toast]);

  const handleRegenerate = () => {
    setProgress(0);
    setIsGenerating(true);
    setGeneratedImage('');
    
    // Restart generation process
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          setGeneratedImage('https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face');
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  const handleDownload = () => {
    // Check if it's a premium style
    const premiumStyles = ['cyberpunk', 'hanfu', 'seasons'];
    if (premiumStyles.includes(style)) {
      toast({
        title: "付费解锁",
        description: "该风格需要付费解锁，是否前往支付？",
        action: (
          <Button size="sm" onClick={() => console.log('Navigate to payment')}>
            立即购买
          </Button>
        ),
      });
      return;
    }

    // Simulate download for free styles
    toast({
      title: "下载开始",
      description: "高清头像正在下载到您的设备",
    });
  };

  const getStyleInfo = (styleId: string) => {
    const styleMap: { [key: string]: { name: string; isPremium: boolean } } = {
      'qversion': { name: 'Q版漫画', isPremium: false },
      'minimalist': { name: '简约线条', isPremium: false },
      'pixel': { name: '怀旧像素', isPremium: false },
      'cyberpunk': { name: '赛博霓虹', isPremium: true },
      'hanfu': { name: '古风汉服', isPremium: true },
      'seasons': { name: '24节气系列', isPremium: true }
    };
    return styleMap[styleId] || { name: '未知风格', isPremium: false };
  };

  const styleInfo = getStyleInfo(style);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white shadow-sm">
        <Button variant="ghost" onClick={() => navigate('/')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回
        </Button>
        <div className="text-center">
          <h2 className="font-semibold flex items-center">
            {styleInfo.isPremium && <Crown className="w-4 h-4 mr-1 text-yellow-500" />}
            {styleInfo.name}
          </h2>
        </div>
        <Button variant="ghost" onClick={() => navigate('/profile')}>
          历史
        </Button>
      </div>

      <div className="p-4 space-y-6 max-w-md mx-auto">
        {/* Progress Section */}
        {isGenerating && (
          <Card>
            <CardContent className="p-4">
              <div className="text-center space-y-3">
                <Sparkles className="w-8 h-8 mx-auto text-purple-600 animate-spin" />
                <h3 className="font-medium">AI正在生成您的专属头像...</h3>
                <Progress value={progress} className="w-full" />
                <p className="text-sm text-gray-600">{Math.round(progress)}% 完成</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Image Comparison */}
        <div className="grid grid-cols-2 gap-4">
          {/* Original Image */}
          <Card>
            <CardContent className="p-3">
              <h4 className="text-sm font-medium mb-2 text-center">原图</h4>
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                {originalImage && (
                  <img 
                    src={originalImage} 
                    alt="Original" 
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </CardContent>
          </Card>

          {/* Generated Image */}
          <Card>
            <CardContent className="p-3">
              <h4 className="text-sm font-medium mb-2 text-center">生成图</h4>
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                {isGenerating ? (
                  <div className="text-center">
                    <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-xs text-gray-500 mt-2">生成中...</p>
                  </div>
                ) : generatedImage ? (
                  <img 
                    src={generatedImage} 
                    alt="Generated" 
                    className="w-full h-full object-cover"
                  />
                ) : null}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Adjustment Controls */}
        {!isGenerating && (
          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="font-medium flex items-center">
                <Palette className="w-4 h-4 mr-2" />
                智能调优
              </h3>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>萌系指数</span>
                    <span>{cuteness[0]}%</span>
                  </div>
                  <Slider
                    value={cuteness}
                    onValueChange={setCuteness}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>色彩饱和度</span>
                    <span>{saturation[0]}%</span>
                  </div>
                  <Slider
                    value={saturation}
                    onValueChange={setSaturation}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        {!isGenerating && (
          <div className="space-y-3">
            <Button 
              onClick={handleRegenerate}
              variant="outline"
              className="w-full"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              重新生成
            </Button>

            <Button 
              onClick={handleDownload}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Download className="w-4 h-4 mr-2" />
              {styleInfo.isPremium ? '付费下载高清图' : '下载高清图'}
            </Button>

            {styleInfo.isPremium && (
              <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
                <CardContent className="p-3">
                  <div className="text-center space-y-2">
                    <Crown className="w-6 h-6 mx-auto text-yellow-600" />
                    <p className="text-sm font-medium text-yellow-800">
                      该风格为付费内容
                    </p>
                    <p className="text-xs text-yellow-700">
                      开通会员享受无限生成特权
                    </p>
                    <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                      立即开通会员
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneratePage;
